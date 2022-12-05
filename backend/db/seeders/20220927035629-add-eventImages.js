"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "EventImages";
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: "https://i.pinimg.com/originals/2b/d8/55/2bd855f6cd45d6f2afc755b811af2258.jpg",
        preview: true,
      },
      {
        eventId: 2,
        url: "https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg",
        preview: true,
      },
      {
        eventId: 3,
        url: "https://i.imgur.com/G8tOaeY.jpg",
        preview: true,
      },
      {
        eventId: 4,
        url: "https://images.hdqwalls.com/wallpapers/anime-scenery-sitting-4k-hs.jpg",
        preview: true,
      },
      {
        eventId: 5,
        url: "https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/1610912652422-5DB14EV6QR7GBFBE9U2W/41.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "EventImages";
    await queryInterface.bulkDelete(options, null, {});
  },
};
