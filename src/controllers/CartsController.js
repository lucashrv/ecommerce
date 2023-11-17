const cartsServices = require("../services/cartsServices")

class CartsController {

    async create(req, res) {
        try {
            const cart = await cartsServices.create(req)

            res.status(201).json(cart)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getAllUserCarts(req, res) {
        try {
            const findAll = await cartsServices.getAllUserCarts(req)

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const update = await cartsServices.update(req)

            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            const destroy = await cartsServices.destroy(req)

            return res.status(200).json(destroy)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = CartsController
