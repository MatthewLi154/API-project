"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Groups",
      [
        {
          organizerId: 1,
          name: "Cat Lovers",
          about: "We love all sorts of cats.",
          type: "In person",
          private: false,
          city: "Cat city",
          state: "CA",
        },
        {
          organizerId: 2,
          name: "Dog Lovers",
          about: "We love all sorts of dogs.",
          type: "In person",
          private: false,
          city: "Dog city",
          state: "WA",
        },
        {
          organizerId: 3,
          name: "Veggie Lovers",
          about: "We love all sorts of Veggies.",
          type: "In person",
          private: true,
          city: "Veg city",
          state: "LA",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Groups", null, {});
  },
};

// INSERT INTO Groups (organizerId, name, about, type, private, city, state)
// VALUES (3, "Dog Lovers", "We love all sorts of dogs.", "In person", true, "asodfa", "sdiofjasf");
