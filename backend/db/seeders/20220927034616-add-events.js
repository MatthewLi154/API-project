"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Events", [
      {
        venueId: 1,
        groupId: 1,
        name: "Cat meet up",
        description: "Bring your cats",
        type: "In person",
        capacity: 30,
        price: 10,
        startDate: new Date("October 09, 2022"),
        endDate: new Date("October 10, 2022"),
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Dog meet up",
        description: "Bring your dog",
        type: "In person",
        capacity: 50,
        price: 7,
        startDate: new Date("November 09, 2022"),
        endDate: new Date("November 10, 2022"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
