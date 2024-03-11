const { users } = require("../models")
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

module.exports = new (class UserService {
    async register(body) {
        const { email, password, confirmPassword } = body

        handleError(password !== confirmPassword, 'Senhas não correspondem')

        const userExists = await handleSearch(users, { email })
        handleError(userExists, "Email já cadastrado")

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        const createUser = await handleCreate(users, {
            ...body,
            password: hash
        })

        return createUser
    }

    async login(body) {
        const { email, password } = body

        const user = await handleSearch(users, { email })
        const checkPassword = await bcrypt.compare(password, user.password)
        handleError(!user || !checkPassword, "Email ou senha inválido(s)", 400)

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET,
            { expiresIn: "3d" }
        )

        return {
            token,
            name: user.name
        }
    }

    async getUser(id) {
        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado`)

        return user
    }

    async changePassword(req) {
        const { id } = req.connectedUser
        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body

        handleError(
            newPassword !== confirmPassword || currentPassword === newPassword,
            'Senhas não correspondem'
        )

        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado`)

        const passCompare = await bcrypt.compare(currentPassword, user.password)
        handleError(!passCompare, "Senha atual inválida");

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(newPassword, salt)

        await users.update({ password: hash }, { where: { id } })
    }

    async changeName(req) {
        const { id } = req.connectedUser

        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado`)

        await users.update({ ...req.body }, { where: { id } })
    }

    async addBalance(req) {
        const { id: userId } = req.connectedUser
        const { id } = req.params
        const { balance } = req.body

        const user = await handleSearchOne(users, userId)
        handleError(!user, `Usuário não encontrado`)

        const changeIdBalance = user.role === "admin" && !!id ? id : userId

        handleError(
            !!id && user.role === "user",
            "Você não tem permissão para adicionar saldo de outros usuários"
        )

        const changeUser =
            user.role === "admin" && !!id ?
            await handleSearchOne(users, id) :
            user

        await users.update({
            balance: changeUser.balance + balance
        }, { where: { id: changeIdBalance } })

        return {
            oldBalance: Number(changeUser.balance.toFixed(2)),
            addBalance: balance,
            newBalance: Number((changeUser.balance + balance).toFixed(2))
        }
    }

    async destroy(req) {
        const { id } = req.params

        const user = await handleSearchOne(users, id)
        handleError(!user, "Usuário inexistente")

        await handleDestroy(users, { id })
    }
})
