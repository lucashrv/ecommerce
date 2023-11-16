const { Router } = require("express")
const UserAddressesController = require("../controllers/UserAddressesController")
const yupValidation = require("../middlewares/yupValidation")
const { userAddressesSchema } = require("../schemas/UserAdressesSchema")
const validateToken = require("../middlewares/validateToken")
const adminVerify = require("../middlewares/adminVerify")

class UserAddressesRoute {
    constructor() {
        this.routes = Router()

        this.userAddressesController = new UserAddressesController()
    }

    setup() {
        // Private for all users and admins
        this.routes.post(
            "/userAdresses",
            validateToken,
            yupValidation(userAddressesSchema),
            this.userAddressesController.create
        )
        this.routes.get(
            "/userAdresses/:id?",
            validateToken,
            this.userAddressesController.getOneAddresses
        )
        this.routes.put(
            "/products/:id",
            validateToken,
            adminVerify,
            yupValidation(productsSchema),
            this.productsController.update
        )
        // this.routes.delete(
        //     "/products/:id",
        //     validateToken,
        //     adminVerify,
        //     yupValidation(idSchema),
        //     this.productsController.destroy
        // )

        return this.routes
    }
}

module.exports = UserAddressesRoute
