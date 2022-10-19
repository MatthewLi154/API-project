"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("GroupImages", [
      {
        groupId: 1,
        url: "https://www.pngitem.com/pimgs/m/128-1284663_shiba-inu-clipart-cute-anime-chibi-cute-kawaii.png",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/1280px-Cow_female_black_white.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GroupImages", null, {});
  },
};
