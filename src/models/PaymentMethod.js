"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class PaymentType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            this.belongsTo(models.users, { foreignKey: "user_id" }),
                this.belongsTo(models.payment_type, { foreignKey: "payment_type_id" })
        }
    }

    PaymentType.init(
        {
            name: { type: DataTypes.STRING(50), allowNull: false },
            number: { type: DataTypes.BIGINT(), allowNull: false },
            code: { type: DataTypes.INTEGER(), allowNull: false },
            month: { type: DataTypes.INTEGER(), allowNull: false },
            year: { type: DataTypes.INTEGER(), allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "payment_methods"
        }
    )
    return PaymentType
}
