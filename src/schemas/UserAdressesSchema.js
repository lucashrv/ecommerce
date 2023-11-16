const yup = require("../services/TranslationsYup")

const userAddressesSchema = ({
    body: yup.object({
        country: yup.string(50).required(),
        state: yup.string(50).required(),
        city: yup.string(50).required(),
        district: yup.string(50).required(),
        street: yup.string(50).required(),
        number: yup.string(15).required(),
        zip_code: yup.number().integer().required(),
        is_default: yup.boolean().required()
    })
})

module.exports = {
    userAddressesSchema
}
