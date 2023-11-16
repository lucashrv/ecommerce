const userAddressesServices = require("../services/userAddressesServices")

class UserAddressesController {

    async create(req, res) {
        try {
            const address = await userAddressesServices.create(req)

            res.status(201).json(address)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getOneAddresses(req, res) {
        try {
            const findAll = await userAddressesServices.getOneAddresses(req)

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const update = await userAddressesServices.update(req)

            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            const destroy = await userAddressesServices.destroy(req)

            return res.status(200).json(destroy)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = UserAddressesController
