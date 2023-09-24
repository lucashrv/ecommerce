const { Router } = require("express")
const UserController = require("../controllers/UserController")
const yupValidation = require("../middlewares/yupValidation")
const userSchema = require("../schemas/userSchema")

class UserRoute {
    constructor () {
        this.routes = Router()

        this.userController = new UserController()
    }

    setup () {
        this.routes.get("/get", this.userController.get)
        this.routes.post(
            "/post",
            yupValidation(userSchema),
            this.userController.create
        )

        return this.routes
    }
}

module.exports = UserRoute
