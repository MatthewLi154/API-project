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
      "Events",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        venueId: {
          type: Sequelize.INTEGER,
        },
        groupId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
        },
        name: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.ENUM("Online", "In person"),
          defaultValue: "In person",
        },
        capacity: {
          type: Sequelize.INTEGER,
        },
        price: {
          type: Sequelize.DECIMAL,
        },
        startDate: {
          type: Sequelize.DATE,
        },
        endDate: {
          type: Sequelize.DATE,
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
    await queryInterface.dropTable("Events", options);
  },
};
