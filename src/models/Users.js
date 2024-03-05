"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
        static associate(models) {}
    }

    Users.init(
        {
            name: { type: DataTypes.STRING(50), allowNull: false },
            email: { type: DataTypes.STRING(50), allowNull: false },
            password: { type: DataTypes.STRING(), allowNull: false },
            role: { type: DataTypes.STRING(10), allowNull: true, defaultValue: 'user' },
            balance: { type: DataTypes.FLOAT(), allowNull: true, defaultValue: 0 }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: "users"
        }
    )

    return Users
}
