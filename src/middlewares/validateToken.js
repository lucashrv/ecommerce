const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: "Acesso negado" })

    const secret = process.env.SECRET

    try {
        jwt.verify(token, secret)

        next()

    } catch (error) {
        return res.status(400).json({ message: "Token invalido" })
    }
}

module.exports = validateToken
