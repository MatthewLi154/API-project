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
        startDate: "2022-10-10",
        endDate: "2022-11-10",
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Dog meet up",
        description: "Bring your dog",
        type: "In person",
        capacity: 50,
        price: 7,
        startDate: "2022-10-09",
        endDate: "2022-11-09",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
