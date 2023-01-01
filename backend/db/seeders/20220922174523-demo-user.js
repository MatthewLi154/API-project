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
      },
      {
        email: "user1@user.io",
        username: "FakeUser1",
        hashedPassword: bcrypt.hashSync("password2"),
        firstName: "Loid",
        lastName: "Forger",
      },
      {
        email: "user2@user.io",
        username: "FakeUser2",
        hashedPassword: bcrypt.hashSync("password16"),
        firstName: "Anya",
        lastName: "Forger",
      },
      {
        email: "user3@user.io",
        username: "FakeUser3",
        hashedPassword: bcrypt.hashSync("password3"),
        firstName: "Yor",
        lastName: "Forger",
      },
      {
        email: "user4@user.io",
        username: "FakeUser4",
        hashedPassword: bcrypt.hashSync("password4"),
        firstName: "Tommy",
        lastName: "Hilfiger",
      },
      {
        email: "user5@user.io",
        username: "FakeUser5",
        hashedPassword: bcrypt.hashSync("password5"),
        firstName: "Calvein",
        lastName: "Klein",
      },
      {
        email: "user6@user.io",
        username: "FakeUser6",
        hashedPassword: bcrypt.hashSync("password6"),
        firstName: "Tiffany",
        lastName: "Co",
      },
      {
        email: "user7@user.io",
        username: "FakeUser7",
        hashedPassword: bcrypt.hashSync("password7"),
        firstName: "Latato",
        lastName: "Crost",
      },
      {
        email: "user8@user.io",
        username: "FakeUser8",
        hashedPassword: bcrypt.hashSync("password8"),
        firstName: "Lara",
        lastName: "Croft",
      },
      {
        email: "user9@user.io",
        username: "FakeUser9",
        hashedPassword: bcrypt.hashSync("password9"),
        firstName: "You",
        lastName: "Tube",
      },
      {
        email: "user10@user.io",
        username: "FakeUser10",
        hashedPassword: bcrypt.hashSync("password10"),
        firstName: "Micro",
        lastName: "Soft",
      },
      {
        email: "user11@user.io",
        username: "FakeUser11",
        hashedPassword: bcrypt.hashSync("password11"),
        firstName: "Sam",
        lastName: "Sung",
      },
      {
        email: "user12@user.io",
        username: "FakeUser12",
        hashedPassword: bcrypt.hashSync("password12"),
        firstName: "Will",
        lastName: "Power",
      },
      {
        email: "user13@user.io",
        username: "FakeUser13",
        hashedPassword: bcrypt.hashSync("password13"),
        firstName: "Jack",
        lastName: "Daniels",
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
