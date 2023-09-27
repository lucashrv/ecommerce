"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            this.hasMany(models.products, { foreignKey: "category_id" })
        }
    }

    Categories.init(
        {
            name: { type: DataTypes.STRING(20), allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "categories"
        }
    )

    return Categories
}
