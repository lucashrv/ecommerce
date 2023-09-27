const { Router } = require("express")
const ProductsController = require("../controllers/ProductsController")
const yupValidation = require("../middlewares/yupValidation")
// const {  } = require("../schemas/categoriesSchema")
const validateToken = require("../middlewares/validateToken")

class ProductsRouter {
    constructor () {
        this.routes = Router()

        this.productsController = new ProductsController()
    }

    setup () {
        this.routes.post(
            "/products",
            validateToken,
            yupValidation(),
            this.productsController.create
            )
        this.routes.get(
            "/products",
            validateToken,
            yupValidation(),
            this.productsController.getAll
            )
        this.routes.put(
            "/products/:id",
            validateToken,
            yupValidation(),
            this.productsController.update
            )
        this.routes.delete(
            "/products/:id",
            validateToken,
            yupValidation(),
            this.productsController.destroy
            )

        this.routes
    }
}

module.exports = ProductsRouter
