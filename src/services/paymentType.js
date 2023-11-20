const { payment_type } = require("../models")
const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
} = require("./handleServices/handleUtils")

module.exports = new (class PaymentType {
    async create(req) {
        const { name } = req.body

        const PaymentType = await handleSearch(payment_type, { name })

        handleError(PaymentType, "Nome existente")

        return await handleCreate(payment_type, { ...req.body })
    }
    async getAll() {
        return await handleSearchAll(payment_type)
    }

    async update(req) {
        const { id } = req.params

        const paymentType = await handleSearchOne(payment_type, id)
        handleError(!paymentType, "Tipo de pagamento não encontrado")

        await payment_type.update({ ...req.body }, { where: { id } })

        return { ...paymentType, ...req.body }
    }

    async destroy(req) {
        const { id } = req.params

        const paymentType = await handleSearchOne(payment_type, id)
        handleError(!paymentType, "Tipo de pagamento não encontrado")

        await handleDestroy(payment_type, { id })

        return { "Tipo de pagamento deletado": { ...paymentType } }
    }
})
