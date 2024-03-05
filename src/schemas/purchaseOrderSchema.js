const yup = require("../services/TranslationsYup")

const purchaseOrderSchema = ({
    body: yup.object({
        products: yup.required(),
        total_price: yup.number().required(),
        order_id: yup.number().required(),
        user_id: yup.number().required()
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
    purchaseOrderSchema,
    // cartsIdSchema
}
