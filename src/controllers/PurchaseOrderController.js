const purchaseOrderServices = require("../services/purchaseOrderServices")

class PurchaseOrderController {

    async create(req, res) {
        try {
            const purchaseOrder = await purchaseOrderServices.create(req)

            res.status(201).json(purchaseOrder)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getAll(req, res) {
        try {
            const findAll = await purchaseOrderServices.getAll(req)

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = PurchaseOrderController
