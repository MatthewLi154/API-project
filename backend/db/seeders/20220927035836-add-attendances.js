"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Attendances", [
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
        eventId: 1,
        userId: 4,
        status: "member",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
