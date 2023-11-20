"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class PaymentType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {}
    }

    PaymentType.init(
        {
            type: { type: DataTypes.STRING(50), allowNull: false },
            name: { type: DataTypes.STRING(50), allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "payment_type"
        }
    )

    return PaymentType
}
