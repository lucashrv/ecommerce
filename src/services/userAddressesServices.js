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

module.exports = new (class UserAddressesService {
    async create(req) {
        handleError(!req.connectedUser.id, "Usuário não conectado")

        return await handleCreate(user_addresses, {
            ...req.body,
            user_id: req.connectedUser.id
        })
    }
    // Get one user all addresses
    async getOneAddresses(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const user = await handleSearchOne(users, id)
        const currentUser = await handleSearchOne(users, userId)

        handleError(id && !user, "Usuário não encontrado")
        handleError(
            +id !== +userId && currentUser.role !== "admin",
            "Somente o próprio usuário ou admins possuem acesso"
        )

        const searchId = id ? id : req.connectedUser.id

        return await user_addresses.findAll({
            where: { user_id: searchId }
        })
    }

    async update(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const currentUser = await handleSearchOne(users, userId)

        const address = await handleSearchOne(user_addresses, id)
        handleError(!address, "Endereço inexistente")

        handleError(
            +id !== +userId && currentUser.role !== "admin",
            "Somente o próprio usuário ou admins possuem acesso"
        )

        await user_addresses.update({
            ...req.body,
        }, { where: { id } })

        return { ...req.body }
    }

    async destroy(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const currentUser = await handleSearchOne(users, userId)

        const address = await handleSearchOne(user_addresses, id)
        handleError(!address, "Endereço inexistente")

        handleError(
            +id !== +userId && currentUser.role !== "admin",
            "Somente o próprio usuário ou admins possuem acesso"
        )

        await handleDestroy(user_addresses, { id })

        return { "Produto deletado": { ...address } }
    }
})
