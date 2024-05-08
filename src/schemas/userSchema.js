const yup = require("../services/TranslationsYup")

const userLoginSchema = ({
    body: yup.object({
        email: yup.string(40).email().min(1),
        password: yup.string().min(8)
    })
})

const userSignUpSchema = ({
    body: yup.object({
        name: yup.string(40).min(1),
        email: yup.string(40).email().min(1),
        password: yup.string(30).min(8),
        balance: yup.number().notRequired(),
        confirmPassword: yup.string(30).min(8),
        role: yup.string().oneOf(['user', 'admin']).notRequired()
    })
})

const userPassSchema = ({
    body: yup.object({
        currentPassword: yup.string().min(8),
        newPassword: yup.string().min(8),
        confirmPassword: yup.string().min(8)
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

const userUpdateSchema = ({
    params: yup.object({
        id: yup.number().integer().positive().required()
    }),
    body: yup.object({
        name: yup.string(40).min(1),
        email: yup.string(40).email().min(1),
        role: yup.string().oneOf(['user', 'admin']).notRequired(),
        balance: yup.number().required()
    })
})

module.exports = {
    userSignUpSchema,
    userLoginSchema,
    userPassSchema,
    userNameSchema,
    userIdSchema,
    userBalanceSchema,
    userUpdateSchema
}
