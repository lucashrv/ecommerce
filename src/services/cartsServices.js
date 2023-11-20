const { carts, products, users } = require("../models")
const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
} = require("./handleServices/handleUtils")

module.exports = new (class CartsService {
    async create(req) {
        const { product_id, quantity } = req.body
        const { id: userId } = req.connectedUser

        const product = await handleSearchOne(products, product_id)
        const cart = await handleSearch(carts, { user_id: userId, product_id })

        handleError(cart, "Já existe um carrinho com este produto")
        handleError(!product, "Produto não encontrado")
        handleError(
            quantity > product.amount,
            "Quantidade solicitada maior que o estoque"
        )

        return await handleCreate(carts, {
            ...req.body,
            unity_price: +product.price,
            full_price: +product.price * quantity,
            user_id: userId
        })
    }
    async getAllUserCarts(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const user = await handleSearchOne(users, id)
        const currentUser = await handleSearchOne(users, userId)

        handleError(!user, "Usuário não encontrado")
        handleError(
            +id !== +userId && currentUser.role !== "admin",
            "Somente o próprio usuário ou admins possuem acesso"
        )

        return await carts.findAll({
            where: { user_id: id }
        })
    }

    async update(req) {
        const { id } = req.params
        const { quantity } = req.body
        const { id: userId } = req.connectedUser

        const currentUser = await handleSearchOne(users, userId)

        const cart = await handleSearchOne(carts, id)
        handleError(!cart, "Carrinho não encontrado")

        handleError(
            +cart.user_id !== +userId && currentUser.role !== "admin",
            "Somente o próprio usuário ou admins possuem acesso"
        )

        handleError(+cart.quantity === +quantity, "Quantidade igual altere-a")

        const product = await handleSearchOne(products, cart.product_id)

        handleError(
            quantity > product.amount,
            "Quantidade solicitada maior que o estoque"
        )

        await carts.update({
            quantity
        }, { where: { id } })

        return { ...cart, quantity }
    }

    async destroy(req) {
        const { id } = req.params
        const { id: userId } = req.connectedUser

        const currentUser = await handleSearchOne(users, userId)

        const cart = await handleSearchOne(carts, id)
        handleError(!cart, "Carrinho não encontrado")

        handleError(
            +id !== +userId && currentUser.role !== "admin",
            "Somente o próprio usuário ou admins possuem acesso"
        )

        await handleDestroy(carts, { id })

        return { "Carrinho deletado": { ...cart } }
    }
})
