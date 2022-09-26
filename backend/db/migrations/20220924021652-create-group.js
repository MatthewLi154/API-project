"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      organizerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("In person", "Online"),
        defaultValue: "In person",
      },
      private: {
        type: Sequelize.BOOLEAN,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Groups");
  },
};