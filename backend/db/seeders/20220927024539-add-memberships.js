"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Memberships";
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: "co-host",
      },
      {
        userId: 2,
        groupId: 2,
        status: "co-host",
      },

      {
        userId: 2,
        groupId: 1,
        status: "pending",
      },
      {
        userId: 3,
        groupId: 1,
        status: "co-host",
      },
      {
        userId: 4,
        groupId: 2,
        status: "member",
      },
      {
        userId: 5,
        groupId: 2,
        status: "pending",
      },
      {
        userId: 6,
        groupId: 2,
        status: "co-host",
      },
      {
        userId: 7,
        groupId: 3,
        status: "member",
      },
      {
        userId: 8,
        groupId: 3,
        status: "co-host",
      },
      {
        userId: 9,
        groupId: 4,
        status: "co-host",
      },
      {
        userId: 10,
        groupId: 4,
        status: "member",
      },
      {
        userId: 11,
        groupId: 5,
        status: "co-host",
      },
      {
        userId: 12,
        groupId: 6,
        status: "co-host",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Memberships";
    await queryInterface.bulkDelete(options);
  },
};
