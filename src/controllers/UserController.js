const { users } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class UserController {

    async register(req, res) {
        const {
            name,
            email,
            password,
            role
        } = req.body

        const userExists = await users.findOne({ where: { email } })

        if (userExists) return res.status(422).json({ message: "Email já cadastrado" })

        const salt = await bcrypt.genSalt(12)

        const hash = await bcrypt.hash(password, salt)

        try {

            const create = await users.create({
                name,
                email,
                password: hash,
                role
            })

            return res.status(201).json({
                message: "Usuário criado com sucesso",
                body: { ...create, password: "not visible" }
            })

        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        const user = await users.findOne({ where: { email } })
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!user) return res.status(404).json({ message: "Usuário não encontrado" })
        if (!checkPassword) return res.status(422).json({ message: "Senha inválida" })

        const secret = process.env.SECRET

        try {
            const token = jwt.sign({
                id: user.id
            }, secret)

            return res.status(200).json({
                message: "Autenticado com sucesso",
                token
            })

        } catch (error) {
            res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }

    async findUser(req, res) {
        const { id } = req.params

        try {
            const user = await users.findOne({
                where: { id },
                attributes: { exclude: ["password"] }
            })

            if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

            return res.status(200).json({ body: user })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno",
                error: error.message
            })
        }
    }
}

module.exports = UserController
