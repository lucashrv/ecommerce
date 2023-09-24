const { users } = require("../models")

class UserController {
    async get (req, res) {
        try {
            return res.json({ msg: "USER GET" })
        } catch (error) {
            console.log(error)

            return res.status(500).send(error)
        }
    }

    async create (req, res) {
        const {
            name,
            email,
            password,
            role
        } = req.body

        try {
            const create = await users.create({
                name,
                email,
                password,
                role
            })

            return res.status(200).json({
                message: 'User created',
                body: create
            })
        } catch (err) {
            console.log(err)

            res.status(500).send(err)
        }
    }
}

module.exports = UserController
