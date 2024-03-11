const yup = require("../services/TranslationsYup")

const userRegisterSchema = ({
    body: yup.object({
        name: yup.string(50).required().min(3).max(50),
        email: yup.string(50).email().required().min(3).max(50),
        password: yup.string().required().min(8),
        confirmPassword: yup.string().required().min(8)
    })
})

const userLoginSchema = ({
    body: yup.object({
        email: yup.string(50).email().min(1).max(50),
        password: yup.string().min(8)
    })
})

const userPassSchema = ({
    body: yup.object({
        currentPassword: yup.string().required().min(8),
        newPassword: yup.string().required().min(8),
        confirmPassword: yup.string().required().min(8)
    })
})

const userNameSchema = ({
    body: yup.object({
        name: yup.string(50).required().min(3).max(50)
    })
})

const userBalanceSchema = ({
    body: yup.object({
        balance: yup.number().required()
    })
})

const userIdSchema = ({
    params: yup.object({
        id: yup.number().integer().positive().required()
    })
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userPassSchema,
    userNameSchema,
    userIdSchema,
    userBalanceSchema
}
