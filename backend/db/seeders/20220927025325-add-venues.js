"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Venues";
    await queryInterface.bulkInsert("Venues", [
      {
        groupId: 1,
        address: "Crazy Man Avenue",
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
    options.tableName = "Venues";
    await queryInterface.bulkDelete(options);
  },
};
