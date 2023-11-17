const yup = require("../services/TranslationsYup")

const cartsSchema = ({
    body: yup.object({
        product_id: yup.number().positive().moreThan(0).required(),
        quantity: yup.number().positive().moreThan(0).required(),
    })
})
const cartsIdSchema = ({
    body: yup.object({
        quantity: yup.number().positive().moreThan(0).required(),
    }),
    params: yup.object({
        id: yup.number().positive().moreThan(0).required()
    })
})

module.exports = {
    cartsSchema,
    cartsIdSchema
}
