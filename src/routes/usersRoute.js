const { Router } = require("express")
const UserController = require("../controllers/UserController")
const yupValidation = require("../middlewares/yupValidation")
const {
    userRegisterSchema,
    userLoginSchema,
    userPassSchema,
    userNameSchema,
    userIdSchema
} = require("../schemas/userSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class UsersRoute {
    constructor () {
        this.routes = Router()

        this.userController = new UserController()
    }

    setup () {
        this.routes.post(
            "/user/register",
            yupValidation(userRegisterSchema),
            this.userController.register
        )
        this.routes.post(
            "/user/login",
            yupValidation(userLoginSchema),
            this.userController.login
        )

        this.routes.use(validateToken)

        this.routes.get(
            "/user/:id",
            this.userController.findUser
        )
        this.routes.patch(
            "/user",
            yupValidation(userPassSchema),
            this.userController.changePassword
        )
        this.routes.patch(
            "/user/changeName",
            yupValidation(userNameSchema),
            this.userController.changeName
        )

        this.routes.use(adminVerify)

        this.routes.delete(
            "/user/:id",
            yupValidation(userIdSchema),
            this.userController.destroy
        )

        return this.routes
    }
}

module.exports = UsersRoute
