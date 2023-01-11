"use strict";
const bcrypt = require("bcryptjs");

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
        firstName: "Demo",
        lastName: "User",
        profileImg:
          "https://i.pinimg.com/564x/32/53/6d/32536d847adf1cea9d41b4d98d0d222b.jpg",
      },
      {
        email: "user1@user.io",
        username: "FakeUser1",
        hashedPassword: bcrypt.hashSync("password2"),
        firstName: "Loid",
        lastName: "Forger",
        profileImg:
          "https://i.pinimg.com/564x/67/5b/67/675b67e888e90ed48dc34e7ab2babbcb.jpg",
      },
      {
        email: "user2@user.io",
        username: "FakeUser2",
        hashedPassword: bcrypt.hashSync("password16"),
        firstName: "Anya",
        lastName: "Forger",
        profileImg:
          "https://i.pinimg.com/564x/84/7a/65/847a65683f58bee8bed86815d9883681.jpg",
      },
      {
        email: "user3@user.io",
        username: "FakeUser3",
        hashedPassword: bcrypt.hashSync("password3"),
        firstName: "Yor",
        lastName: "Forger",
        profileImg:
          "https://i.pinimg.com/564x/79/a7/28/79a72887776e1d07d7df54d49f1f84c6.jpg",
      },
      {
        email: "user4@user.io",
        username: "FakeUser4",
        hashedPassword: bcrypt.hashSync("password4"),
        firstName: "Tommy",
        lastName: "Hilfiger",
        profileImg:
          "https://i.pinimg.com/564x/98/74/86/9874861b97a847f7f2e95cb374ca583c.jpg",
      },
      {
        email: "user5@user.io",
        username: "FakeUser5",
        hashedPassword: bcrypt.hashSync("password5"),
        firstName: "Calvein",
        lastName: "Klein",
        profileImg:
          "https://i.pinimg.com/564x/74/2f/72/742f72a84b34b0aef2d674c1c1414c74.jpg",
      },
      {
        email: "user6@user.io",
        username: "FakeUser6",
        hashedPassword: bcrypt.hashSync("password6"),
        firstName: "Tiffany",
        lastName: "Co",
        profileImg:
          "https://i.pinimg.com/564x/2a/6c/fe/2a6cfe0aecf1ba14803f0431ea84a56d.jpg",
      },
      {
        email: "user7@user.io",
        username: "FakeUser7",
        hashedPassword: bcrypt.hashSync("password7"),
        firstName: "Latato",
        lastName: "Crost",
        profileImg:
          "https://i.pinimg.com/564x/27/5f/03/275f03dd82fcc739fb9c4718230059f8.jpg",
      },
      {
        email: "user8@user.io",
        username: "FakeUser8",
        hashedPassword: bcrypt.hashSync("password8"),
        firstName: "Lara",
        lastName: "Croft",
        profileImg:
          "https://i.pinimg.com/564x/7c/9c/3f/7c9c3f7fadf402951dffe4c610e140ac.jpg",
      },
      {
        email: "user9@user.io",
        username: "FakeUser9",
        hashedPassword: bcrypt.hashSync("password9"),
        firstName: "You",
        lastName: "Tube",
        profileImg:
          "https://i.pinimg.com/564x/9d/88/a5/9d88a52d74a501001bc3a03a1bc1dfda.jpg",
      },
      {
        email: "user10@user.io",
        username: "FakeUser10",
        hashedPassword: bcrypt.hashSync("password10"),
        firstName: "Micro",
        lastName: "Soft",
        profileImg:
          "https://i.pinimg.com/564x/91/23/87/912387021f653e08d3b108b2d0828bd5.jpg",
      },
      {
        email: "user11@user.io",
        username: "FakeUser11",
        hashedPassword: bcrypt.hashSync("password11"),
        firstName: "Sam",
        lastName: "Sung",
        profileImg:
          "https://i.pinimg.com/564x/0f/8f/26/0f8f26d7b656cb749c3af414bb8a8744.jpg",
      },
      {
        email: "user12@user.io",
        username: "FakeUser12",
        hashedPassword: bcrypt.hashSync("password12"),
        firstName: "Will",
        lastName: "Power",
        profileImg:
          "https://i.pinimg.com/564x/14/06/9b/14069b28b004c59625cf804e9f287845.jpg",
      },
      {
        email: "user13@user.io",
        username: "FakeUser13",
        hashedPassword: bcrypt.hashSync("password13"),
        firstName: "Jack",
        lastName: "Daniels",
        profileImg:
          "https://i.pinimg.com/564x/61/ea/f8/61eaf86203b20657e50dffe2a8e72dd9.jpg",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(
    //   "Users",
    //   {
    //     username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
    //   },
    //   {}
    // );
    options.tableName = "Users";
    return queryInterface.bulkDelete(options);
  },
};
