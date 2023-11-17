"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Carts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            this.belongsTo(models.users, { foreignKey: "user_id" }),
            this.belongsTo(models.products, { foreignKey: "product_id" })
        }
    }

    Carts.init(
        {
            quantity: { type: DataTypes.INTEGER(), allowNull: false },
            unity_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            full_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "carts"
        }
    )

    return Carts
}
