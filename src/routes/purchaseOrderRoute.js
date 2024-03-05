const { Router } = require("express")
const PurchaseOrder = require("../controllers/PurchaseOrderController")
const yupValidation = require("../middlewares/yupValidation")
const {
    purchaseOrderSchema
} = require("../schemas/purchaseOrderSchema")
const { idSchema } = require("../schemas/utilsSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class PurchaseOrderRouter {
    constructor () {
        this.routes = Router()

        this.purchaseOrder = new PurchaseOrder()
    }

    setup () {
        //Private for admins
        this.routes.post(
            "/purchaseorder",
            validateToken,
            yupValidation(purchaseOrderSchema),
            this.purchaseOrder.create
        )
        // this.routes.get(
        //     "/paymentmethod",
        //     validateToken,
        //     adminVerify,
        //     this.purchaseOrder.getAll
        // )
        // this.routes.put(
        //     "/paymentmethod/:id",
        //     validateToken,
        //     adminVerify,
        //     yupValidation(paymentMethodIdSchema),
        //     this.paymentMethod.update
        // )
        // this.routes.delete(
        //     "/paymentmethod/:id",
        //     validateToken,
        //     adminVerify,
        //     yupValidation(idSchema),
        //     this.paymentMethod.destroy
        // )

        return this.routes
    }
}

module.exports = PurchaseOrderRouter
