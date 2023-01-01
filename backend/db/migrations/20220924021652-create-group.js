"use strict";

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Groups",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        organizerId: {
          type: Sequelize.INTEGER,
          // references: {
          //   model: "Users",
          // },
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
          defaultValue: true,
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
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Groups", options);
  },
};
