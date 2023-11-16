"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate (models) {
            this.belongsTo(models.users, { foreignKey: "user_id" }),
            this.belongsTo(models.categories, { foreignKey: "category_id" })
        }
    }

    Products.init(
        {
            name: { type: DataTypes.STRING(30), allowNull: false },
            description: { type: DataTypes.STRING(), allowNull: true },
            price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
            amount: { type: DataTypes.INTEGER(), allowNull: false },
            image: { type: DataTypes.STRING, allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "products"
        }
    )

    return Products
}
