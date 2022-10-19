"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("EventImages", [
      {
        eventId: 1,
        url: "https://i.pinimg.com/originals/2b/d8/55/2bd855f6cd45d6f2afc755b811af2258.jpg",
        preview: true,
      },
      {
        eventId: 2,
        url: "https://tripleseat.com/wp-content/uploads/2022/07/1427781302-huge-2048x1367-1-1536x1025.jpg",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EventImages", null, {});
  },
};
