const express = require("express")

//routes
const users = require("./usersRoute")
const categories = require("./categoriesRoute")
const products = require("./productsRoute")
const userAddresses = require("./userAddressesRoute")
const carts = require("./cartsRoute")
const paymentType = require("./paymentType")

class IndexRoutes {
    constructor () {
        this.routes = express.Router()

        this.users = new users()
        this.categories = new categories()
        this.products = new products()
        this.userAddresses = new userAddresses()
        this.carts = new carts()
        this.paymentType = new paymentType()
    }

    setup () {
        this.routes.use("/api", this.users.setup());
        this.routes.use("/api", this.categories.setup());
        this.routes.use("/api", this.products.setup());
        this.routes.use("/api", this.userAddresses.setup());
        this.routes.use("/api", this.carts.setup());
        this.routes.use("/api", this.paymentType.setup());

        return this.routes
    }
}

module.exports = new IndexRoutes()
