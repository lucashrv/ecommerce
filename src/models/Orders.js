"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate (models) {
            this.belongsTo(models.user_addresses, { foreignKey: "user_addresses_id" });
            this.belongsTo(models.payment_methods, { foreignKey: "payment_methods_id" });
            this.belongsTo(models.users, { foreignKey: "user_id" });
        }
    }

    Orders.init(
        {
            total_price: { type: DataTypes.DECIMAL, allowNull: false },
            is_paid: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_delivered: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false,
            },
            delivered_at: { type: DataTypes.DATE, allowNull: true },
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "orders"
        }
    )

    return Orders
}
