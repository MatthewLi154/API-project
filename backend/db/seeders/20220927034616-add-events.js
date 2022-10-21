"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Events", [
      {
        venueId: 1,
        groupId: 1,
        name: "Bring Your Own Blanket",
        description:
          "Some people just aren’t suited to playing the part of the flashy, in-your-face hero or the dastardly, mustache-twirling villain with larger-than-life panache. Instead, they operate in the shadows and pull the strings of society through wit and cleverness. That’s the role Cid wants to play when he’s transported to another world. Cid spins a yarn or three and becomes the unlikely leader of the underground Shadow Garden organization that fights against a menacing cult (which he totally made up). However, there’s a catch even his wild imagination didn’t see coming: the cult he concocted actually exists, and they’re beyond displeased that his power fantasy just got in the way of their evil plans!",
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
          "When new Soul Reapers and a new enemy appear in his hometown of Karakura, Ichigo jumps back into the battlefield with his Zanpakuto to help those in need. Meanwhile, the Soul Society is observing a sudden surge in the number of Hollows being destroyed in the World of the Living. They also receive separate reports of residents in the Rukon District having gone missing. Finally, the Seireitei, home of the Soul Reapers, comes under attack by a group calling themselves the Wandenreich.",
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
          "Ittoki Sakuraba was an ordinary student, until his life was turned upside down! He finds out that he is the 19th heir of the famous Iga Ninjas. The Iga must try to defend what is theirs from the Koga, a rivaling clan seeking to end Ittoki’s life. Ittoki is left with no choice but to become a shinobi that’s strong enough to not only protect himself, but also his village. Now a student at Kokuten Ninja Academy, a high school specializing in shinobi techniques, Ittoki learns the way of the modern-day ninja, equipped with high-tech suits and gadgets. Together with students from other villages, Ittoki clashes with the Koga in an attempt to end the rivalry once and for all.",
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
          "Third-year high school student Jirou Yakuin hoped to partner with Shiori Sakurazaka of the same class in the mandatory Couple Practical course. In this practical, students must demonstrate that they have the necessary skillset to live with a partner of the opposite sex while presenting a certain level of harmony to the video surveillance that grades them.",
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
          "When new Soul Reapers and a new enemy appear in his hometown of Karakura, Ichigo jumps back into the battlefield with his Zanpakuto to help those in need. Meanwhile, the Soul Society is observing a sudden surge in the number of Hollows being destroyed in the World of the Living. They also receive separate reports of residents in the Rukon District having gone missing. Finally, the Seireitei, home of the Soul Reapers, comes under attack by a group calling themselves the Wandenreich.",
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
