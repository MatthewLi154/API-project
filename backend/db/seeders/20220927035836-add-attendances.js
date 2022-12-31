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
        status: "host",
      },
      {
        eventId: 1,
        userId: 2,
        status: "member",
      },
      {
        eventId: 1,
        userId: 3,
        status: "member",
      },
      {
        eventId: 2,
        userId: 4,
        status: "co-host",
      },
      {
        eventId: 2,
        userId: 5,
        status: "member",
      },
      {
        eventId: 2,
        userId: 6,
        status: "waitlist",
      },
      {
        eventId: 3,
        userId: 7,
        status: "co-host",
      },
      {
        eventId: 3,
        userId: 8,
        status: "member",
      },
      {
        eventId: 3,
        userId: 9,
        status: "member",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Attendances";
    await queryInterface.bulkDelete(options, null, {});
  },
};
