const productsServices = require("../services/productsServices")

class ProductController {

    async create(req, res) {
        try {
            const create = await productsServices.create(req)

            res.status(201).json({
                message: 'Produto criado com sucesso',
                product: create
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getAll(req, res) {
        try {
            const findAll = await productsServices.getAll()

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async update(req, res) {
        try {
            const update = await productsServices.update(req)

            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            const destroy = await productsServices.destroy(req)

            return res.status(200).json({
                message: 'Produto deletado com sucesso',
                product: destroy
            })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = ProductController
