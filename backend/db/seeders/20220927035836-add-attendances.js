"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Attendances";
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        status: "member",
      },
      {
        eventId: 2,
        userId: 2,
        status: "member",
      },
      {
        eventId: 2,
        userId: 3,
        status: "member",
      },
      {
        eventId: 3,
        userId: 4,
        status: "member",
      },
      {
        eventId: 4,
        userId: 4,
        status: "member",
      },
      {
        eventId: 5,
        userId: 4,
        status: "member",
      },
      {
        eventId: 5,
        userId: 4,
        status: "member",
      },
      {
        eventId: 4,
        userId: 4,
        status: "member",
      },
      {
        eventId: 3,
        userId: 4,
        status: "member",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Attendances";
    await queryInterface.bulkDelete(options, null, {});
  },
};
