const ordersServices = require("../services/ordersServices")

class OrdersController {

    async create(req, res) {
        try {
            const cart = await ordersServices.create(req)

            res.status(201).json(cart)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async searchOrder(req, res) {
        try {
            const search = await ordersServices.searchOrder(req)

            res.status(200).json(search)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const update = await ordersServices.update(req)

            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async updateRemoveProduct(req, res) {
        try {
            const update = await ordersServices.updateRemoveProduct(req)

            return res.status(200).json(update)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = OrdersController
