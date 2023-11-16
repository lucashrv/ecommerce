"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserAddresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            this.belongsTo(models.users, { foreignKey: "user_id" })
        }
    }

    UserAddresses.init(
        {
            country: { type: DataTypes.STRING(50), allowNull: false },
            state: { type: DataTypes.STRING(50), allowNull: false },
            city: { type: DataTypes.STRING(50), allowNull: false },
            district: { type: DataTypes.STRING(50), allowNull: false },
            street: { type: DataTypes.STRING(50), allowNull: false },
            number: { type: DataTypes.STRING(15), allowNull: false },
            zip_code: { type: DataTypes.INTEGER(), allowNull: false },
            is_default: { type: DataTypes.BOOLEAN(), allowNull: false }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "user_addresses"
        }
    )

    return UserAddresses
}
