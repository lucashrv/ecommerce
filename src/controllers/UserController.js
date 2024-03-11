const usersServices = require("../services/usersServices")

class UserController {

    async signUp(req, res) {
        try {
            const user = await usersServices.signUp(req.body)
            user["password"] = undefined

            return res.status(201).json({
                message: "Usuário criado com sucesso",
                user
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async login(req, res) {
        try {
            const token = await usersServices.login(req.body)

            return res.status(200).json({
                message: "Autenticado com sucesso",
                auth: token,
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
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

    async addBalance(req, res) {
        try {
            const balance = await usersServices.addBalance(req)

            return res.status(200).json({
                message: "Transação efetuada!",
                ...balance
            })
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
