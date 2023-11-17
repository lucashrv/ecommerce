const yup = require("../services/TranslationsYup")

const idSchema = ({
    params: yup.object({
        id: yup.number().positive().moreThan(0).required()
    })
})

module.exports = {
    idSchema
}
