const { Router } = require("express")
const UserController = require("../controllers/UserController")
const yupValidation = require("../middlewares/yupValidation")
const { userRegisterSchema, userLoginSchema } = require("../schemas/userSchema")
const validateToken = require("../middlewares/validateToken")

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
        this.routes.get(
            "/user/:id",
            validateToken,
            this.userController.findUser
        )

        return this.routes
    }
}

module.exports = UsersRoute
