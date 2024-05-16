const { Router } = require("express")
const PaymentType = require("../controllers/PaymentTypeController")
const yupValidation = require("../middlewares/yupValidation")
const {
    paymentTypeSchema,
    paymentTypeIdSchema
} = require("../schemas/paymentTypeSchema")
const { idSchema } = require("../schemas/utilsSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class PaymentTypeRouter {
    constructor() {
        this.routes = Router()

        this.paymentType = new PaymentType()
    }

    setup() {
        //Private for admins
        this.routes.post(
            "/paymenttype",
            validateToken,
            adminVerify,
            yupValidation(paymentTypeSchema),
            this.paymentType.create
        )
        this.routes.get(
            "/paymenttype",
            validateToken,
            adminVerify,
            this.paymentType.getAll
        )
        this.routes.put(
            "/paymenttype/:id",
            validateToken,
            adminVerify,
            yupValidation(paymentTypeIdSchema),
            this.paymentType.update
        )
        this.routes.delete(
            "/paymenttype/:id",
            validateToken,
            adminVerify,
            yupValidation(idSchema),
            this.paymentType.destroy
        )

        return this.routes
    }
}

module.exports = PaymentTypeRouter
