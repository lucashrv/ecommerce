const yup = require("../services/TranslationsYup")

const userRegisterSchema = ({
    body: yup.object({
        name: yup.string(50).required(),
        email: yup.string(50).email().required(),
        password: yup.string().required(),
        role: yup.string(10).required()
    })
})

const userLoginSchema = ({
    body: yup.object({
        email: yup.string(50).email().required(),
        password: yup.string().required()
    })
})

module.exports = {
    userRegisterSchema,
    userLoginSchema
}
