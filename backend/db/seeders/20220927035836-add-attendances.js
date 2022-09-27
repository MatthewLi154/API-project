"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Attendances", [
      {
        eventId: 1,
        userId: 1,
        status: "member",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
