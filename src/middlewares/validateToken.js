const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ message: "Acesso negado" })

        const verifiedToken = jwt.verify(token, process.env.SECRET)

        req.connectedUser = verifiedToken

        next()

    } catch (err) {
        return res.status(403).json({ error: "Token inválido" })
    }
}

module.exports = validateToken
