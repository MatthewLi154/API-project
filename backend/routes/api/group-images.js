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
  const findImage = await GroupImage.findOne({
    where: {
      id: req.params.imageId,
    },
    include: [
      {
        model: Group,
        attributes: ["id", "organizerId"],
        include: [
          {
            model: Membership,
          },
        ],
      },
    ],
  });

  if (findImage) {
    let image = findImage.toJSON();
    // check if organizer or co-host
    let isOrganizer = false;
    if (req.user.id === image.Group.organizerId) {
      isOrganizer = true;
    }
    // check if co-host
    let isCoHost = false;
    image.Group.Memberships.forEach((membership) => {
      if (
        req.user.id === membership.userId &&
        membership.status === "co-host"
      ) {
        isCoHost = true;
      }
    });
    if (isCoHost || isOrganizer) {
      const destroyImage = await GroupImage.findOne({
        where: {
          id: req.params.imageId,
        },
      });

      await destroyImage.destroy();

      res.status(200);
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      return res.json({
        message: "User is not organizer or co-host",
      });
    }
  } else {
    res.status(404);
    return res.json({
      message: "Group image couldn't be found",
      statusCode: 404,
    });
  }
});

module.exports = router;
