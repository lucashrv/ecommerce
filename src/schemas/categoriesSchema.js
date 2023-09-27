const yup = require("../services/TranslationsYup")

const categoriesSchema = ({
    body: yup.object({ name: yup.string(30).required().min(1).max(30) })
})

module.exports = { categoriesSchema }
