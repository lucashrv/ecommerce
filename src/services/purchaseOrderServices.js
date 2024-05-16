const { purchase_order, users } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
} = require("./handleServices/handleUtils")

module.exports = new (class PurchaseOrderServices {
    async create(req) {
        const { name } = req.body;

        const findOrder = await handleSearchOne(purchase_order, name);

        handleError(findOrder, "Transação já existente!");

        return await handleCreate(purchase_order, req.body);
    };

    async getAll(req) {
        const { id } = req.connectedUser

        const user = await users.findOne({ where: { id } })

        handleError(!user, "Somente usuários conectados tem permissão!")

        return await purchase_order.findAll({ where: { id } });
    };
})
