const yup = require("../services/TranslationsYup")

const paymentMethodSchema = ({
    body: yup.object({
        name: yup.string().required(),
        number: yup.number().positive().moreThan(0).required(),
        code: yup.number().positive().moreThan(0).required(),
        month: yup.number().positive().moreThan(0).required(),
        year: yup.number().positive().moreThan(0).required(),
        payment_type_id: yup.number().positive().moreThan(0).required()
    })
})

const paymentMethodIdSchema = ({
    params: yup.object({
        id: yup.number().positive().moreThan(0).required()
    }),
    body: yup.object({
        name: yup.string().required(),
        number: yup.number().positive().moreThan(0).required(),
        code: yup.number().positive().moreThan(0).required(),
        month: yup.number().positive().moreThan(0).required(),
        year: yup.number().positive().moreThan(0).required(),
        payment_type_id: yup.number().positive().moreThan(0).required()
    })
})

module.exports = {
    paymentMethodSchema,
    paymentMethodIdSchema
}
