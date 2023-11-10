const { categories } = require("../models")

const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
} = require("./handleServices/handleUtils");

const create = async (body) => {
    const { name } = body

    const searchCategory = await handleSearchAll(categories, { name })

    handleError(searchCategory.length, "Categoria já existente!")

    return handleCreate(categories, body)
}

const getAll = async () => {
    return handleSearchAll(categories)
}

const update = async (req) => {
    const { id } = req.params
    const { name } = req.body

    const category = await handleSearchOne(categories, id)
    handleError(!category, "Categoria inexistente")

    const searchName = await handleSearchAll(categories, { name })
    handleError(searchName.length, "Nome já cadastrado")

    await categories.update({ ...req.body }, { where: { id } })

    return { id, ...req.body }
}

const destroy = async (params) => {
    const { id } = params

    const category = await handleSearchOne(categories, id)
    handleError(!category, "Categoria inexistente")

    return await handleDestroy(categories, { id })
}

module.exports = {
    getAll,
    create,
    update,
    destroy
}
