const yup = require("../services/TranslationsYup")

const orderSchema = ({
    body: yup.object({
        total_price: yup.number().moreThan(0).required(),
        is_paid: yup.boolean().default(false),
        is_delivered: boolean().default(false),
        delivered_at: yup.date()
    }) //schemas falta terminar
})
// const cartsIdSchema = ({
//     body: yup.object({
//         quantity: yup.number().positive().moreThan(0).required(),
//     }),
//     params: yup.object({
//         id: yup.number().positive().moreThan(0).required()
//     })
// })

module.exports = {
    orderSchema,
    // cartsIdSchema
}
