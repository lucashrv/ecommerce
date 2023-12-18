const { Router } = require("express")
const PaymentMethod = require("../controllers/PaymentMethodController")
const yupValidation = require("../middlewares/yupValidation")
const {
    paymentMethodSchema,
    paymentMethodIdSchema
} = require("../schemas/paymentMethodSchema")
const { idSchema } = require("../schemas/utilsSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class PaymentMethodRouter {
    constructor () {
        this.routes = Router()

        this.paymentMethod = new PaymentMethod()
    }

    setup () {
        //Private for admins
        this.routes.post(
            "/paymentmethod",
            validateToken,
            adminVerify,
            yupValidation(paymentMethodSchema),
            this.paymentMethod.create
        )
        this.routes.get(
            "/paymentmethod",
            validateToken,
            adminVerify,
            this.paymentMethod.getAll
        )
        this.routes.put(
            "/paymentmethod/:id",
            validateToken,
            adminVerify,
            yupValidation(paymentMethodIdSchema),
            this.paymentMethod.update
        )
        this.routes.delete(
            "/paymentmethod/:id",
            validateToken,
            adminVerify,
            yupValidation(idSchema),
            this.paymentMethod.destroy
        )

        return this.routes
    }
}

module.exports = PaymentMethodRouter
