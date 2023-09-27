const { Products } = require("../models/Products")

class Products {
    async create (req, res) {
        const {
            name,
            description,
            price,
            amount,
            image,
            category_id
        } = req.body

        try {
            const create = await Products.create({
                name,
                description,
                price,
                amount,
                image,
                category_id
            })

            return res.status(201).json({
                message: "Produto criado",
                body: { ...create.dataValues }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async getAll (req, res) {
        try {
            const getAll = await Products.findAll()

            return res.status(200).json(getAll)
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async update (req, res) {
        const { id } = req.params
        const {
            name,
            description,
            price,
            amount,
            image,
            category_id
        } = req.body

        const idExists = await Products.findByPk(id, { raw: true })

        if (!idExists) return res.status(404).json({ message: "id não encontrado" })

        try {
            await Products.update({
                name,
                description,
                price,
                amount,
                image,
                category_id
            },
            {
                where: { id }
            })

            return res.status(200).json({
                message: "Produto atualizado",
                body: {
                    id,
                    ...req.body
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async destroy (req, res) {
        const { id } = req.params

        const idExists = await Products.findByPk(id, { raw: true })

        if (!idExists) return res.status(404).json({ message: "id não encontrado" })

        try {
            await Products.destroy({ where: { id } })

            return res.status(200).json({
                message: "Produto deletado",
                body: { ...idExists }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }
}

module.exports = Products
