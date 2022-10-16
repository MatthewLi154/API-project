"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("GroupImages", [
      {
        groupId: 1,
        url: "https://secure-content.meetupstatic.com/images/classic-events/507784425/178x178.jpg?w=178?w=256",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://secure-content.meetupstatic.com/images/classic-events/506871800/178x178.jpg?w=178?w=256",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://secure-content.meetupstatic.com/images/classic-events/507411661/178x178.jpg?w=178?w=256",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GroupImages", null, {});
  },
};
