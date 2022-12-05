"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: "Bring Your Own Blanket",
        description:
          "Some people just aren’t suited to playing the part of the flashy, in-your-face hero or the dastardly, mustache-twirling villain with larger-than-life panache.",
        type: "In person",
        capacity: 30,
        price: 10,
        startDate: new Date("October 28, 2022"),
        endDate: new Date("October 29, 2022"),
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Anime Social",
        description:
          "When new Soul Reapers and a new enemy appear in his hometown of Karakura, Ichigo jumps back into the battlefield with his Zanpakuto to help those in need.",
        type: "In person",
        capacity: 50,
        price: 7,
        startDate: new Date("November 09, 2022"),
        endDate: new Date("November 10, 2022"),
      },
      {
        venueId: 3,
        groupId: 3,
        name: "After Party",
        description:
          "Ittoki Sakuraba was an ordinary student, until his life was turned upside down! He finds out that he is the 19th heir of the famous Iga Ninjas.",
        type: "In person",
        capacity: 50,
        price: 7,
        startDate: new Date("November 09, 2022"),
        endDate: new Date("November 10, 2022"),
      },
      {
        venueId: 4,
        groupId: 4,
        name: "Shokugeki Duel",
        description:
          "Third-year high school student Jirou Yakuin hoped to partner with Shiori Sakurazaka of the same class in the mandatory Couple Practical course. ",
        type: "In person",
        capacity: 50,
        price: 7,
        startDate: new Date("December 09, 2022"),
        endDate: new Date("June 10, 2022"),
      },
      {
        venueId: 5,
        groupId: 5,
        name: "Anime Social",
        description:
          "When new Soul Reapers and a new enemy appear in his hometown of Karakura, Ichigo jumps back into the battlefield with his Zanpakuto to help those in need. ",
        type: "In person",
        capacity: 50,
        price: 7,
        startDate: new Date("November 09, 2022"),
        endDate: new Date("November 10, 2022"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkDelete(options);
  },
};
