const { categories } = require("../models")
const categoriesServices = require("../services/categoriesServices")

class CategoriesController {

    async create(req, res) {
        try {
            const category = await categoriesServices.create(req.body)

            res.status(200).json(category)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getAll(req, res) {
        try {
            const findAll = await categoriesServices.getAll()

            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async update(req, res) {
        try {
            const updatedCategory = await categoriesServices.update(req)

            return res.status(200).json(updatedCategory)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            await categoriesServices.destroy(req.params)

            res.status(200).json({
                "Categoria deletada(id)": req.params.id
            })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = CategoriesController
