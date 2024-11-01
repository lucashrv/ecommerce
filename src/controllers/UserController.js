const usersServices = require("../services/usersServices")

class UserController {

    async signUp(req, res) {
        try {
            const user = await usersServices.signUp(req.body)
            user["password"] = undefined

            return res.status(201).json({
                message: "Usuário criado com sucesso!",
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
                message: "Autenticado com sucesso!",
                auth: token,
            })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async findUserRole(req, res) {
        try {
            const user = await usersServices.findUserRole(req)

            res.status(200).json({ role: user.role })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            res.status(statusCode).json({ error: err.message })
        }
    }

    async findAllPaginateSearch(req, res) {
        try {
            const users = await usersServices.findAllPaginateSearch(req)

            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async findUser(req, res) {
        try {
            const user = await usersServices.getUser(req)
            user["password"] = undefined

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async changePassword(req, res) {
        try {
            await usersServices.changePassword(req)

            res.status(200).json({ message: "Senha alterada!" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async changeName(req, res) {
        try {
            await usersServices.changeName(req)

            return res.status(200).json({ message: "Nome alterado!" })
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

    async update(req, res) {
        try {
            await usersServices.update(req)

            return res.status(200).json({ message: "Usuário foi editado!" })
        } catch (err) {
            const statusCode = err.status ? err.status : 500
            return res.status(statusCode).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            await usersServices.destroy(req)

            return res.status(200).json({ message: "Usuário deletado!" })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = UserController
