const yup = require("../services/TranslationsYup")

const productsSchema = ({
    body: yup.object({
        name: yup.string(30).required().max(30),
        description: yup.string().notRequired(),
        price: yup.number().required(),
        amount: yup.number().integer().required(),
        image: yup.string().required(),
        category_id: yup.number().integer().moreThan(0).required()
    })
})

module.exports = {
    productsSchema
}
