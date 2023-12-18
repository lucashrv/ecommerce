const paymentTypeServices = require("../services/paymentType")

class PaymentType {

    async create(req, res) {
        try {
            const paymentType = await paymentTypeServices.create(req)

            res.status(201).json(paymentType)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getAll(req, res) {
        try {
            const findAll = await paymentTypeServices.getAll()

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const update = await paymentTypeServices.update(req)

            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            const destroy = await paymentTypeServices.destroy(req)

            return res.status(200).json(destroy)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = PaymentType
