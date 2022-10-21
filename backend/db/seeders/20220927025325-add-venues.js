"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Venues", [
      {
        groupId: 1,
        address: "1615 Arland Ave",
        city: "Rosemead",
        state: "CA",
        lat: 5.2,
        lng: 5.3,
      },
      {
        groupId: 2,
        address: "Banana way",
        city: "Chino",
        state: "CA",
        lat: 6.2,
        lng: 6.3,
      },
      {
        groupId: 3,
        address: "Apple Circle",
        city: "San Diego",
        state: "CA",
        lat: 7.2,
        lng: 7.3,
      },
      {
        groupId: 4,
        address: "Apple Circle",
        city: "San Diego",
        state: "CA",
        lat: 7.2,
        lng: 7.3,
      },
      {
        groupId: 5,
        address: "Apple Circle",
        city: "San Diego",
        state: "CA",
        lat: 7.2,
        lng: 7.3,
      },
      {
        groupId: 6,
        address: "Apple Circle",
        city: "San Diego",
        state: "CA",
        lat: 7.2,
        lng: 7.3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Venues", null, {});
  },
};
