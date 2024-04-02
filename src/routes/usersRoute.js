const { Router } = require("express")
const UserController = require("../controllers/UserController")
const yupValidation = require("../middlewares/yupValidation")
const {
    userSignUpSchema,
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
            "/user/signup",
            yupValidation(userSignUpSchema),
            this.userController.signUp
        )
        this.routes.post(
            "/user/login",
            yupValidation(userLoginSchema),
            this.userController.login
        )
        this.routes.get(
            "/user/checkauth",
            this.userController.checkAuth
        )
        //Private auth
        this.routes.post(
            "/user/logout",
            validateToken,
            this.userController.logout
        )
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
        this.routes.get(
            "/user/role",
            validateToken,
            this.userController.findUserRole
        )
        //Private admins
        this.routes.get(
            "/users",
            validateToken,
            adminVerify,
            this.userController.findAllPaginateSearch
        )
        this.routes.get(
            "/user",
            validateToken,
            adminVerify,
            this.userController.findUser
        )
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
