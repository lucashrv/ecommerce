const { products, categories } = require("../models")
const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
} = require("./handleServices/handleUtils")

module.exports = new (class UserService {
    async create(req) {
        const { category_id } = req.body

        const category = await handleSearchOne(categories, category_id)
        handleError(!category, "Categoria não encontrada")

        handleError(!req.connectedUser.id, "Usuário não conectado")

        return await handleCreate(products, {
            ...req.body,
            user_id: req.connectedUser.id
        })
    }

    async getAll() {
        return await handleSearchAll(products)
    }
    // return products.findAll({
    //     include: [{
    //         model: users,
    //         attributes: { exclude: ['password'] }
    //     }],
    // })

    async update(req) {
        const { id } = req.params
        const { category_id } = req.body

        const product = await handleSearchOne(products, id)
        handleError(!product, "Produto inexistente")

        const category = await handleSearchOne(categories, category_id)
        handleError(!category, "Categoria inexistente")

        await products.update({
            ...req.body,
            user_id: req.connectedUser.id
        }, { where: { id } })

        return { ...product, ...req.body, user_id: req.connectedUser.id }
    }

    async destroy(req) {
        const { id } = req.params

        const product = await handleSearchOne(products, id)
        handleError(!product, "Usuário inexistente")

        await handleDestroy(products, { id })

        return { ...product }
    }
})
