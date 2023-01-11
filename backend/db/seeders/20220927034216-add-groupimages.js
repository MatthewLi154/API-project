"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: "https://images5.alphacoders.com/112/1126202.jpg",
        preview: true,
      },
      {
        groupId: 1,
        url: "https://i.pinimg.com/564x/38/57/c7/3857c756ee2c7e8d72546d6f841be367.jpg",
        preview: true,
      },
      {
        groupId: 1,
        url: "https://i.pinimg.com/564x/96/4f/06/964f06cb9839579bc28f58a23e04d2f8.jpg",
        preview: true,
      },
      {
        groupId: 1,
        url: "https://i.pinimg.com/564x/41/9f/8e/419f8e73156df48bd0a9be1612fc23dc.jpg",
        preview: true,
      },
      {
        groupId: 1,
        url: "https://i.pinimg.com/564x/6d/81/23/6d81233623642a1cf782d68795683bf0.jpg",
        preview: true,
      },
      {
        groupId: 1,
        url: "https://i.pinimg.com/564x/f6/4f/c5/f64fc51cca6dfeed33995d5b6f7ec061.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://assets-prd.ignimgs.com/2022/06/27/spy-x-family-blogroll-1656350614480.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://i.pinimg.com/564x/df/a9/f3/dfa9f37552c64d97dd47330509c0470e.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://i.pinimg.com/736x/8f/b6/ce/8fb6ceaf39ecd9ba3d69d4386c4f4a6c.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://i.pinimg.com/564x/f2/cf/1f/f2cf1fa6daefc3d980dc7eeae4750dd6.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://i.pinimg.com/564x/8f/b6/ce/8fb6ceaf39ecd9ba3d69d4386c4f4a6c.jpg",
        preview: true,
      },
      {
        groupId: 2,
        url: "https://i.pinimg.com/564x/e2/80/45/e28045438ae8282785cc322d03f1b175.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://i.pinimg.com/564x/fc/6b/1a/fc6b1a58827c411d3c18eca925904136.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://i.pinimg.com/736x/b4/2b/80/b42b80772bb24d7d665cbe5790f9afbb.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://i.pinimg.com/736x/94/f5/7f/94f57f0b2d3563b5633052e17f56b925.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://i.pinimg.com/564x/89/ed/fa/89edfa4a1e0fab23735d98ca9805d44b.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://i.pinimg.com/564x/ca/87/e2/ca87e219f5b330f6a86d464e9bf2d609.jpg",
        preview: true,
      },
      {
        groupId: 3,
        url: "https://i.pinimg.com/564x/ed/da/af/eddaafc06dece250fba90120f079287a.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://staticc.sportskeeda.com/editor/2022/10/e5239-16653124022354-1920.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://i.pinimg.com/564x/1a/02/3e/1a023e3e172af29cfee6c906cfa0990e.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://i.pinimg.com/564x/5c/3d/8a/5c3d8adad4bf7b67b0df1b14bbae9988.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://i.pinimg.com/564x/a0/d0/83/a0d08378f558664cb8de5652c1b8a4f9.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://i.pinimg.com/564x/c7/f3/09/c7f30965d4e9e36594a6a86e8318cbfc.jpg",
        preview: true,
      },
      {
        groupId: 4,
        url: "https://i.pinimg.com/564x/71/a9/b9/71a9b95ab312159464756694d3f19e03.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://i.pinimg.com/564x/0a/ba/ed/0abaedfb030f74474fb8075090d695c7.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://i.pinimg.com/736x/9c/98/a0/9c98a0e234f95f95ef7ca3a008c21318.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://i.pinimg.com/564x/bd/fa/cc/bdfacc46d48111bf603b2add54ca5cf3.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://i.pinimg.com/564x/3e/b3/2c/3eb32cefb792e5716d14abc3b4ce0e1c.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://i.pinimg.com/564x/fb/46/2d/fb462d93244f0c7557c791bb60204bd0.jpg",
        preview: true,
      },
      {
        groupId: 5,
        url: "https://i.pinimg.com/564x/2e/aa/91/2eaa91fe072c8c2694eee7422af98052.jpg",
        preview: true,
      },
      {
        groupId: 6,
        url: "https://i.pinimg.com/originals/8a/ce/a9/8acea9261c892e75b0651de1d4f4e0e1.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    await queryInterface.bulkDelete(options);
  },
};
