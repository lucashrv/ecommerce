const yupValidation = (allSchemas) => async (req, res, next) => {

    // const body = req.body

    const errorsResult = {}

    // try {
    //     await schema.validate(body)

    //     return next()
    // } catch (error) {
    //     return res.status(400).json({ error })
    // }
    Object.entries(allSchemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key], { abortEarly: false })

        } catch (err) {

            const yupError = err
            const errors = {}
            // return res.send(yupError.inner)

            yupError.inner.forEach(error => {
                if (!error.path) return

                errors[error.path] = error.message
            })

            errorsResult[key] = errors
        }
    })

    if (Object.entries(errorsResult).length === 0) {
        return next()
    } else {
        return res.status(400).json({ errors: errorsResult })
    }
}

module.exports = yupValidation
