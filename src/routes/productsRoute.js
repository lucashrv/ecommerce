const { Router } = require("express")
const ProductsController = require("../controllers/ProductsController")
const yupValidation = require("../middlewares/yupValidation")
const { productsSchema, idSchema } = require("../schemas/productsSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class ProductsRoute {
    constructor() {
        this.routes = Router()

        this.productsController = new ProductsController()
    }

    setup() {
        //Public
        this.routes.get(
            "/products",
            this.productsController.getAll
        )
        //Private for admins
        this.routes.post(
            "/products",
            validateToken,
            adminVerify,
            yupValidation(productsSchema),
            this.productsController.create
        )
        this.routes.put(
            "/products/:id",
            validateToken,
            adminVerify,
            yupValidation(productsSchema),
            this.productsController.update
        )
        this.routes.delete(
            "/products/:id",
            validateToken,
            adminVerify,
            yupValidation(idSchema),
            this.productsController.destroy
        )

        return this.routes
    }
}

module.exports = ProductsRoute
