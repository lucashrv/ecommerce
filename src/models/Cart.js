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
        }
    }

    Carts.init(
        {
            name: { type: DataTypes.STRING(20), allowNull: false }
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
