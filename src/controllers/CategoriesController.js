const { categories } = require("../models")

class CategoriesController {
    async create (req, res) {
        const { name } = req.body

        const nameExists = await categories.findOne({ where: { name } })

        if (nameExists) return res.status(422).json({ message: "Nome já cadastrado" })

        try {
            const create = await categories.create({ name })

            return res.status(201).json({
                message: "Categoria criada",
                body: { ...create.dataValues }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async update (req, res) {
        const { id } = req.params
        const { name } = req.body

        const idExits = await categories.findByPk(id)
        const nameExits = await categories.findOne({ where: { name } })

        if (!idExits) return res.status(404).json({ message: "id não encontrado" })
        if (nameExits) return res.status(404).json({ message: "Nome já existe" })

        try {
            await categories.update({
                name
            },
            {
                where: { id }
            })

            return res.status(200).json({
                message: "Categoria atualizada",
                body: {
                    id,
                    ...req.body
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro interno',
                error: error.message
            })
        }
    }

    async getAll (req, res) {
        try {
            const getAll = await categories.findAll()

            return res.status(200).json({ body: getAll })
        } catch (error) {
            res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async destroy (req, res) {
        const { id } = req.params

        const idExist = await categories.findByPk(id, { raw: true })

        if (!id || !idExist) return res.status(404).json({ message: "id não encontrado" })

        try {
            await categories.destroy({ where: { id } })

            return res.status(200).json({
                message: "Categoria deletada",
                body: { ...idExist }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }
}

module.exports = CategoriesController
