"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("EventImages", [
      {
        eventId: 1,
        url: "event-1-image",
        preview: true,
      },
      {
        eventId: 2,
        url: "event-2-image",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EventImages", null, {});
  },
};
