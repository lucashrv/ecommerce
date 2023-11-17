const { Router } = require("express")
const UserAddressesController = require("../controllers/UserAddressesController")
const yupValidation = require("../middlewares/yupValidation")
const { userAddressesSchema, idSchema } = require("../schemas/UserAdressesSchema")
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
            "/userAdresses/:id",
            validateToken,
            this.userAddressesController.getOneAddresses
        )
        this.routes.put(
            "/userAdresses/:id",
            validateToken,
            yupValidation(userAddressesSchema),
            this.userAddressesController.update
        )
        this.routes.delete(
            "/userAdresses/:id",
            validateToken,
            yupValidation(idSchema),
            this.userAddressesController.destroy
        )

        return this.routes
    }
}

module.exports = UserAddressesRoute
