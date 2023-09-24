const yup = require("../services/TranslationsYup")

const userSchema = ({
    body: yup.object({
        name: yup.string(50).required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(15),
        role: yup.string(10).required()
    })
})

module.exports = userSchema
