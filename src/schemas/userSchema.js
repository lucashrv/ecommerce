const yup = require("../services/TranslationsYup")

const userRegisterSchema = ({
    body: yup.object({
        name: yup.string(50).required().min(1).max(50),
        email: yup.string(50).email().required().min(1).max(50),
        password: yup.string().required().min(1),
        role: yup.string(10).required().min(1).max(10)
    })
})

const userLoginSchema = ({
    body: yup.object({
        email: yup.string(50).email().required().min(1).max(50),
        password: yup.string().required().min(3)
    })
})

module.exports = {
    userRegisterSchema,
    userLoginSchema
}
