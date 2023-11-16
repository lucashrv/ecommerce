const { user_addresses, users } = require("../models")
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
        handleError(!req.connectedUser.id, "Usuário não conectado")

        return await handleCreate(user_addresses, {
            ...req.body,
            user_id: req.connectedUser.id
        })
    }
    // Get one user all addresses or get current user addresses
    async getOneAddresses(req) {
        const { id } = req.params

        const user = await handleSearchOne(users, id)
        handleError(id && !user, "Usuário não encontrado")

        const searchId = id ? id : req.connectedUser.id

        return await user_addresses.findAll({
            where: { user_id: searchId }
        })
    }

    // async update(req) {
    //     const { id } = req.params
    //     const { category_id } = req.body

    //     const product = await handleSearchOne(products, id)
    //     handleError(!product, "Produto inexistente")

    //     const category = await handleSearchOne(categories, category_id)
    //     handleError(!category, "Categoria inexistente")

    //     await products.update({
    //         ...req.body,
    //         user_id: req.connectedUser.id
    //     }, { where: { id } })

    //     return { ...product, ...req.body, user_id: req.connectedUser.id }
    // }

    // async destroy(req) {
    //     const { id } = req.params

    //     const product = await handleSearchOne(products, id)
    //     handleError(!product, "Usuário inexistente")

    //     await handleDestroy(products, { id })

    //     return { "Produto deletado": { ...product } }
    // }
})
