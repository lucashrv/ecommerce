const yup = require("../services/TranslationsYup")

const categoriesSchema = ({
    body: yup.object({ name: yup.string().required().max(30) })
})

const categoriesIdSchema = ({
    params: yup.object({ id: yup.number().integer().required() })
})

const categoriesFullSchema = ({
    params: yup.object({ id: yup.number().integer().required() }),
    body: yup.object({ name: yup.string().required().max(30) })
})

module.exports = {
    categoriesSchema,
    categoriesIdSchema,
    categoriesFullSchema
}
