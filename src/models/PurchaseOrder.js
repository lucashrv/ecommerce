"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PurchaseOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            this.belongsTo(models.orders, { foreignKey: "order_id" });
            this.belongsTo(models.users, { foreignKey: "user_id" });
        }
    }

    PurchaseOrder.init(
        {
            products: { type: DataTypes.JSON, allowNull: false },
            total_price: { type: DataTypes.DECIMAL, allowNull: false },
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "purchase_order"
        }
    )

    return PurchaseOrder
}
