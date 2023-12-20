const { payment_methods, payment_type } = require("../models")
const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
} = require("./handleServices/handleUtils")

module.exports = new (class paymentMethod {
    async create(req) {
        const { id: userId } = req.connectedUser
        const { payment_type_id } = req.body

        const paymentType = await handleSearchOne(payment_type, payment_type_id)
        handleError(!paymentType, "Tipo de pagamento não encontrado")

        return await handleCreate(payment_methods, {
            ...req.body,
            payment_type_id,
            user_id: userId
        })
    }

    async getAll() {
        return await handleSearchAll(payment_methods)
    }

    async update(req) {
        const { id } = req.params
        const { payment_type_id } = req.body

        const paymentMethod = await handleSearchOne(payment_methods, id)
        handleError(!paymentMethod, "Método de pagamento não encontrado")
        const paymentType = await handleSearchOne(payment_type, payment_type_id)
        handleError(!paymentType, "Tipo de pagamento não encontrado")

        await payment_methods.update({ ...req.body }, { where: { id } })

        return { ...paymentMethod, ...req.body }
    }

    async destroy(req) {
        const { id } = req.params

        const paymentMethod = await handleSearchOne(payment_methods, id)
        handleError(!paymentMethod, "Método de pagamento não encontrado")

        await handleDestroy(payment_methods, { id })

        return { "Método de pagamento deletado": { ...paymentMethod } }
    }
})
