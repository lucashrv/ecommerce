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
const Sequelize = require('sequelize')

module.exports = new (class UserService {
    async signUp(body) {
        const { email, password, confirmPassword } = body

        handleError(password !== confirmPassword, 'Senhas não correspondem!', 400)

        const userExists = await handleSearch(users, { email })
        handleError(userExists, "Email já cadastrado!", 422)

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
        handleError(!user, "Email inválido!", 400)

        const checkPassword = await bcrypt.compare(password, user.password)
        handleError(!checkPassword, "Senha inválida!", 400)

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET,
            { expiresIn: "365d" }
        )

        return {
            token,
            name: user.name
        }
    }

    async findUserRole(req) {
        const { id } = req.connectedUser

        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado!`, 404)

        return user
    }

    async findAllPaginateSearch(req) {
        const {
            page = 1,
            limit = 10,
            search,
            order = 'name',
            orderType = 'ASC'
        } = req.query;
        const offset = (page - 1) * limit

        // Pagination / Search => 'ILIKE'
        const usersQuery = await users.findAndCountAll({
            where: {
                [Sequelize.Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('email')),
                        {
                            [Sequelize.Op.like]: `%${search.toLowerCase()}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('name')),
                        {
                            [Sequelize.Op.like]: `%${search.toLowerCase()}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('role')),
                        {
                            [Sequelize.Op.like]: `%${search.toLowerCase()}%`
                        }
                    )
                ]
            },
            limit: parseInt(limit),
            offset,
            order: [[order, orderType]],
            attributes: { exclude: ['password'] }
        })

        return { page, ...usersQuery, }
    }

    async getUser(req) {
        const { id } = req.params
        const { id: connectedUserId } = req.connectedUser

        const connectedUser = await handleSearchOne(users, connectedUserId)
        handleError(
            connectedUser.role !== 'admin' && connectedUser.id !== ~~id,
            `Sem permissão de acesso!`,
            401
        )

        const findUser = await handleSearchOne(users, id)
        handleError(!findUser, `Usuário não encontrado!`, 404)

        return findUser
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
            'Senhas não correspondem!'
        )

        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado!`)

        const passCompare = await bcrypt.compare(currentPassword, user.password)
        handleError(!passCompare, "Senha atual inválida!");

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(newPassword, salt)

        await users.update({ password: hash }, { where: { id } })
    }

    async changeName(req) {
        const { id } = req.connectedUser

        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado!`)

        await users.update({ ...req.body }, { where: { id } })
    }

    async addBalance(req) {
        const { id: userId } = req.connectedUser
        const { id } = req.params
        const { balance } = req.body

        const user = await handleSearchOne(users, userId)
        handleError(!user, `Usuário não encontrado!`)

        const changeIdBalance = user.role === "admin" && !!id ? id : userId

        handleError(
            !!id && user.role === "user",
            "Você não tem permissão para adicionar saldo de outros usuários!"
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

    async update(req) {
        const {
            name,
            email,
            role,
            balance
        } = req.body
        const { id } = req.params

        const user = await handleSearchOne(users, id)
        handleError(!user, `Usuário não encontrado!`, 404)

        await users.update({
            name,
            email,
            role,
            balance
        }, { where: { id } })
    }

    async destroy(req) {
        const { id } = req.params

        const user = await handleSearchOne(users, id)
        handleError(!user, "Usuário inexistente!")

        await handleDestroy(users, { id })
    }
})
