const { categories } = require("../models")

const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError
} = require("./handleServices/handleUtils");

module.exports = new (class CategoryService {
    async create (body) {
        const { name } = body

        const searchCategory = await handleSearchAll(categories, { name })

        handleError(searchCategory.length, "Categoria já existente!")

        return handleCreate(categories, body)
    }

    async getAll() {
        return handleSearchAll(categories)
    }

    async update(req) {
        const { id } = req.params
        const { name } = req.body

        const category = await handleSearchOne(categories, id)
        handleError(!category, "Categoria inexistente")

        const searchName = await handleSearchAll(categories, { name })
        handleError(searchName.length, "Nome já cadastrado")

        await categories.update({ ...req.body }, { where: { id } })

        return { id, ...req.body }
    }

    async destroy(params) {
        const { id } = params

        const category = await handleSearchOne(categories, id)
        handleError(!category, "Categoria inexistente")

        await handleDestroy(categories, { id })

        return { "Categoria deletada": { ...category } }
    }

})
