const paymentMethodServices = require("../services/paymentMethodServices")

class PaymentMethod {

    async create(req, res) {
        try {
            const PaymentMethod = await paymentMethodServices.create(req)

            res.status(201).json(PaymentMethod)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getAll(req, res) {
        try {
            const findAll = await paymentMethodServices.getAll()

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const update = await paymentMethodServices.update(req)

            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            const destroy = await paymentMethodServices.destroy(req)

            return res.status(200).json(destroy)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = PaymentMethod
