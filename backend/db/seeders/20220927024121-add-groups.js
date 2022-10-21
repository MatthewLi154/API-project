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
            "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita. One day, Denji is betrayed and killed. As his consciousness fades, he makes a contract with Pochita and gets revived as 'Chainsaw Man' — a man with a devil's heart.",
          type: "In person",
          private: false,
          city: "Tokyo",
          state: "JP",
        },
        {
          organizerId: 2,
          name: "Spy x Family Watch Group",
          about:
            "Corrupt politicians, frenzied nationalists, and other warmongering forces constantly jeopardize the thin veneer of peace between neighboring countries Ostania and Westalis. In spite of their plots, renowned spy and master of disguise Twilight fulfills dangerous missions one after another in the hope that no child will have to experience the horrors of war. In the bustling Ostanian city of Berlint, Twilight dons the alias of Loid Forger, an esteemed psychiatrist. However, his true intention is to gather intelligence on prominent politician Donovan Desmond, who only appears rarely in public at his sons' school: the prestigious Eden Academy. Enlisting the help of unmarried city hall clerk Yor Briar to act as his wife and adopting the curious six-year-old orphan Anya as his daughter, Loid enacts his master plan. He will enroll Anya in Eden Academy, where Loid hopes she will excel and give him the opportunity to meet Donovan without arousing suspicion.",
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
            "Some people just arent suited to playing the part of the flashy, in-your-face hero or the dastardly, mustache-twirling villain with larger-than-life panache. Instead, they operate in the shadows and pull the strings of society through wit and cleverness. Thats the role Cid wants to play when hes transported to another world. Cid spins a yarn or three and becomes the unlikely leader of the underground Shadow Garden organization that fights against a menacing cult (which he totally made up). However, theres a catch even his wild imagination didnt see coming: the cult he concocted actually exists, and theyre beyond displeased that his power fantasy just got in the way of their evil plans!",
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
