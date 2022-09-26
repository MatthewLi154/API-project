"use strict";
const express = require("express");
// const {
//   setTokenCookie,
//   restoreUser,
//   requireAuth,
// } = require("../../utils/auth");
const { Group } = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");

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

  console.log(req.params);

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

  console.log(editGroup);
  //   return res.json(editGroup);
  return res.json(editGroup);
});

// Get all groups
router.get("/", async (req, res, next) => {
  const allGroups = await Group.findAll({});

  // need to add aggregate for numMembers
  // need to add previewImage

  return res.json(allGroups);
});

module.exports = router;
