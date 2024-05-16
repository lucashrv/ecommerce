const { Router } = require("express")
const CategoriesController = require("../controllers/CategoriesController")
const yupValidation = require("../middlewares/yupValidation")
const {
    categoriesSchema,
    categoriesIdSchema,
    categoriesFullSchema
} = require("../schemas/categoriesSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class CategoriesRouter {
    constructor() {
        this.routes = Router()

        this.categoriesController = new CategoriesController()
    }

    setup() {
        //Public
        this.routes.get(
            "/categories",
            validateToken,
            this.categoriesController.getAll
        )
        //Private for admins
        this.routes.post(
            "/categories",
            validateToken,
            adminVerify,
            yupValidation(categoriesSchema),
            this.categoriesController.create
        )
        this.routes.put(
            "/categories/:id",
            validateToken,
            adminVerify,
            yupValidation(categoriesFullSchema),
            this.categoriesController.update
        )
        this.routes.delete(
            "/categories/:id",
            validateToken,
            adminVerify,
            yupValidation(categoriesIdSchema),
            this.categoriesController.destroy
        )

        return this.routes
    }
}

module.exports = CategoriesRouter
