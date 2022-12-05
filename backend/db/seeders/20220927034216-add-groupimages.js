"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: "https://cdn.vox-cdn.com/thumbor/v6iJVAeyKD8OetowRsfNn3n58F8=/0x171:1200x771/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21932734/ChainsawMan_GN01_C1_Catalog.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://image.shutterstock.com/shutterstock/photos/1968490054/display_1500/stock-photo-perfect-anime-image-to-be-used-as-wallpaper-1968490054.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://images.hdqwalls.com/wallpapers/anime-ninja-4k-lo.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://wallpaperaccess.com/full/6319352.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://www.fanbolt.com/storage/2021/08/anime-iphone-wallpaper-800x500.jpg",
        preview: true,
      },
      {
        groupId: 6,
        url: "https://i.pinimg.com/originals/8a/ce/a9/8acea9261c892e75b0651de1d4f4e0e1.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    await queryInterface.bulkDelete(options);
  },
};
