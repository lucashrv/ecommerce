const express = require("express")

//routes
const users = require("./userRoute")

class IndexRoutes {
    constructor () {
        this.routes = express.Router()

        this.users = new users()
    }

    setup () {
        this.routes.use("/api", this.users.setup())

        return this.routes
    }
}

module.exports = new IndexRoutes()
