"use strict";
const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  Group,
  Membership,
  User,
  GroupImage,
  Venue,
  Event,
  Attendance,
  EventImage,
  sequelize,
  Sequelize,
} = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
const { Op, json } = require("sequelize");
const e = require("express");

const router = express.Router();

// Delete an image for a group
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  // current use must be organizer or co-host of the group
  // check if organizer
  const findGroup = await Group.findAll({
    attributes: ["id", "organizerId", "name"],
    include: [
      {
        model: GroupImage,
        // where: {
        //   id: req.params.imageId,
        // },
      },
    ],
  });

  let groups = [];
  findGroup.forEach((group) => {
    groups.push(group.toJSON());
  });

  console.log(groups);

  return res.json({ groups });
});

module.exports = router;
