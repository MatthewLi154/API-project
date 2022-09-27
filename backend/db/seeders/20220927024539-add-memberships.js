"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Memberships", [
      {
        userId: 1,
        groupId: 1,
        status: "member",
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
        status: "pending",
      },
      {
        userId: 9,
        groupId: 3,
        status: "co-host",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Memberships", null, {});
  },
};
