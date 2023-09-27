const { Router } = require("express")
const CategoriesController = require("../controllers/CategoriesController")
const yupValidation = require("../middlewares/yupValidation")
const { categoriesSchema } = require("../schemas/categoriesSchema")
const validateToken = require("../middlewares/validateToken")

class CategoriesRouter {
    constructor () {
        this.routes = Router()

        this.categoriesController = new CategoriesController()
    }

    setup () {
        this.routes.post(
            "/categories",
            validateToken,
            yupValidation(categoriesSchema),
            this.categoriesController.create
        )
        this.routes.get(
            "/categories",
            validateToken,
            this.categoriesController.getAll
        )
        this.routes.put(
            "/categories/:id",
            validateToken,
            yupValidation(categoriesSchema),
            this.categoriesController.update
        )
        this.routes.delete(
            "/categories/:id",
            validateToken,
            this.categoriesController.destroy
        )

        return this.routes
    }
}

module.exports = CategoriesRouter
