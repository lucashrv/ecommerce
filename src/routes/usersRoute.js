const { Router } = require("express")
const UserController = require("../controllers/UserController")
const yupValidation = require("../middlewares/yupValidation")
const {
    userRegisterSchema,
    userLoginSchema,
    userPassSchema,
    userNameSchema,
    userIdSchema,
    userBalanceSchema
} = require("../schemas/userSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class UsersRoute {
    constructor () {
        this.routes = Router()

        this.userController = new UserController()
    }

    setup () {
        //Public
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
        //Private for all users and admins
        this.routes.patch(
            "/user",
            validateToken,
            yupValidation(userPassSchema),
            this.userController.changePassword
        )
        this.routes.patch(
            "/user/changeName",
            validateToken,
            yupValidation(userNameSchema),
            this.userController.changeName
        )
        //Private for admins
        this.routes.get(
            "/user/:id",
            validateToken,
            adminVerify,
            this.userController.findUser
        )
        this.routes.patch(
            "/user/balance/:id?",
            validateToken,
            yupValidation(userBalanceSchema),
            this.userController.addBalance
        )
        this.routes.delete(
            "/user/:id",
            validateToken,
            adminVerify,
            yupValidation(userIdSchema),
            this.userController.destroy
        )

        return this.routes
    }
}

module.exports = UsersRoute
