const yup = require("../services/TranslationsYup")

const paymentTypeSchema = ({
    body: yup.object({
        type: yup.string().required().max(50),
        name: yup.string().required().max(50)
    })
})

const paymentTypeIdSchema = ({
    params: yup.object({
        id: yup.number().positive().moreThan(0).required()
    }),
    body: yup.object({
        type: yup.string().required().max(50),
        name: yup.string().required().max(50)
    })
})

module.exports = {
    paymentTypeSchema,
    paymentTypeIdSchema
}
