"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
      });
    }
  }
  Group.init(
    {
      organizerId: {
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      about: DataTypes.STRING,
      type: DataTypes.ENUM(["In person", "Online"]),
      private: DataTypes.BOOLEAN,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      },
    }
  );
  return Group;
};