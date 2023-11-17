const { Router } = require("express")
const CartsController = require("../controllers/CartsController")
const yupValidation = require("../middlewares/yupValidation")
const {
    cartsSchema,
    cartsIdSchema
} = require("../schemas/cartsSchema")
const { idSchema } = require("../schemas/utilsSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class CartsRouter {
    constructor () {
        this.routes = Router()

        this.cartsController = new CartsController()
    }

    setup () {
        // Private for all users and admins
        this.routes.post(
            "/carts",
            validateToken,
            yupValidation(cartsSchema),
            this.cartsController.create
        )
        this.routes.get(
            "/carts/:id",
            validateToken,
            yupValidation(idSchema),
            this.cartsController.getAllUserCarts
        )
        this.routes.patch(
            "/carts/:id",
            validateToken,
            yupValidation(cartsIdSchema),
            this.cartsController.update
        )
        this.routes.delete(
            "/carts/:id",
            validateToken,
            yupValidation(idSchema),
            this.cartsController.destroy
        )

        return this.routes
    }
}

module.exports = CartsRouter
