const { Router } = require("express")
const UserController = require("../controllers/UserController")

class UserRoute {
    constructor () {
        this.routes = Router()

        this.userController = new UserController()
    }

    setup () {
        this.routes.get("/get", this.userController.get)
        this.routes.post("/post", this.userController.create)

        return this.routes
    }
}

module.exports = UserRoute
