"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("GroupImages", [
      {
        groupId: 1,
        url: "Image of group 1",
        preview: true,
      },
      {
        groupId: 2,
        url: "Image of group 2",
        preview: true,
      },
      {
        groupId: 3,
        url: "Image of group 3",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GroupImages", null, {});
  },
};
