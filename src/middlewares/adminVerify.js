const { handleSearchOne, handleError } = require("../services/handleServices/handleUtils")
const { users } = require("../models")

const adminVerify = async (req, res, next) => {
    try {
        const { id: currentId } = req.connectedUser

        const currentUser = await handleSearchOne(users, currentId)

        handleError(
            currentUser.role !== "admin",
            "Somente administradores tem permissão"
        )

        next()

    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

module.exports = adminVerify