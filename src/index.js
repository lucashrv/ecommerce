const express = require("express")
const cors = require("cors")
const routes = require("./routes/routes")
const yup = require("./services/TranslationsYup")
require("dotenv").config()

module.exports = new (class App {
    constructor() {
        this.app = express()

        this.midlewares()

        this.routes()
    }

    midlewares() {
        this.app.use(cors())

        this.app.use(express.json({ limit: "100mb" }))

        this.app.use(express.text({ limit: "100mb" }))

        this.app.use(express.urlencoded({ limit: "100mb", extended: true }))
    }

    routes () {
        this.app.use(routes.setup())
    }
})()
