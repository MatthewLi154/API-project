"use strict";
const express = require("express");
// const {
//   setTokenCookie,
//   restoreUser,
//   requireAuth,
// } = require("../../utils/auth");
const {
  Group,
  Membership,
  User,
  GroupImage,
  sequelize,
  Sequelize,
} = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const e = require("express");

const router = express.Router();

// Create a group
router.post("/", async (req, res, next) => {
  const { name, about, type, city, state } = req.body;

  const newGroup = await Group.create({
    organizerId: req.user.dataValues.id,
    name: name,
    about: about,
    type: type,
    private: req.body.private,
    city: city,
    state: state,
  });

  return res.json(newGroup);
});

// Edit a Group
router.put("/:groupId", async (req, res, next) => {
  const { name, about, type, city, state } = req.body;

  //   console.log(req.params);

  const editGroup = await Group.findOne({
    where: { id: req.params.groupId },
  });

  editGroup.update({
    name: name,
    about: about,
    type: type,
    private: req.body.private,
    city: city,
    state: state,
  });

  //   console.log(editGroup);
  return res.json(editGroup);
});

// Get all groups
router.get("/", async (req, res, next) => {
  let resArr = [];
  let resGroup = {};

  // const allGroups = await Group.findAll({
  //   include: [{ model: Membership }, { model: GroupImage }],
  // });

  const allGroups = await Group.findAll({
    // include: [{ model: GroupImage }],
  });

  for (let i = 0; i < allGroups.length; i++) {
    // For num Members
    resGroup = allGroups[i].dataValues;

    const numMembers = await Membership.findAll({
      where: {
        groupId: allGroups[i].id,
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("userId")), "numMembers"],
      ],
      raw: true,
    });

    // Set numMembers
    resGroup.numMembers = numMembers[0].numMembers;

    // For preview Image
    const previewImage = await GroupImage.findAll({
      where: {
        groupId: allGroups[i].id,
      },
      raw: true,
    });

    // Set previewImage
    if (previewImage[0]) {
      resGroup.previewImage = previewImage[0].url;
    } else {
      resGroup.previewImage = "No image available";
    }

    resArr.push(resGroup);
  }

  return res.json({ Groups: resArr });
});

module.exports = router;
