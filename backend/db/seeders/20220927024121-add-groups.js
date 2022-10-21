"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Groups",
      [
        {
          organizerId: 1,
          name: "Chainsaw Man Fan Club",
          about:
            "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita.",
          type: "In person",
          private: false,
          city: "Tokyo",
          state: "JP",
        },
        {
          organizerId: 2,
          name: "Spy x Family Watch Group",
          about:
            "Corrupt politicians, frenzied nationalists, and other warmongering forces constantly jeopardize the thin veneer of peace between neighboring countries Ostania and Westalis. In spite of their plots, renowned spy ",
          type: "In person",
          private: false,
          city: "Ostania",
          state: "GM",
        },
        {
          organizerId: 3,
          name: "Mob Psycho 100 Enjoyers",
          about:
            "In order to effectuate control on his skills, Mob enlists himself under the wing of Arataka Reigen, a con artist claiming to be a psychic, who exploits Mob's powers for pocket change.",
          type: "In person",
          private: true,
          city: "Seasoning City",
          state: "MP",
        },
        {
          organizerId: 4,
          name: "Blue Lock Cosplayers",
          about:
            "After a disastrous defeat at the 2018 World Cup, Japan's team struggles to regroup. But what's missing? An absolute Ace Striker, who can guide them to the win. ",
          type: "In person",
          private: true,
          city: "Football City",
          state: "PJ",
        },
        {
          organizerId: 5,
          name: "Bleach Readers",
          about:
            "When new Soul Reapers and a new enemy appear in his hometown of Karakura, Ichigo jumps back into the battlefield with his Zanpakuto to help those in need. ",
          type: "In person",
          private: true,
          city: "District",
          state: "SN",
        },
        {
          organizerId: 6,
          name: "All Anime Group",
          about:
            "Some people just arent suited to playing the part of the flashy, in-your-face hero or the dastardly, mustache-twirling villain with larger-than-life panache. Instead, they operate in the shadows ",
          type: "In person",
          private: true,
          city: "Witch Land",
          state: "SQ",
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
