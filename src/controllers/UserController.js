const usersServices = require("../services/usersServices")

class UserController {

    async register(req, res) {
        try {
            const user = await usersServices.register(req.body)
            user["password"] = undefined

            res.status(201).json(user)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async login(req, res) {
        try {
            const token = await usersServices.login(req.body)

            res.status(200).json({
                message: "Autenticado com sucesso",
                token
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async findUser(req, res) {
        const { id } = req.params

        try {
            const user = await usersServices.getUser(id)
            user["password"] = undefined

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async changePassword(req, res) {
        try {
            await usersServices.changePassword(req)

            res.status(200).json({ message: "Senha alterada" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async changeName(req, res) {
        try {
            await usersServices.changeName(req)

            return res.status(200).json({ message: "Nome alterado" })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            await usersServices.destroy(req)

            return res.status(200).json({ message: "Usuário deletado" })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = UserController
