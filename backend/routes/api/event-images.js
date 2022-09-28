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
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op, json } = require("sequelize");
const e = require("express");

const router = express.Router();

// Delete an Image for an Event
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  // Current user must be the organizer or co-host of the group that the event belongs to
  const findImage = await EventImage.findOne({
    where: {
      id: req.params.imageId,
    },
    include: [
      {
        model: Event,
        include: [
          {
            model: Group,
            include: [
              {
                model: Membership,
              },
            ],
          },
        ],
      },
    ],
  });

  if (findImage) {
    console.log(findImage.toJSON());

    // Check if current use is organizer
    let image = findImage.toJSON().Event.Group;
    let isOrganizer = false;
    if (image.organizerId === req.user.id) {
      isOrganizer = true;
    }

    // Check if current user is co-host of group
    let isCoHost = false;
    for (let i = 0; i < image.Memberships.length; i++) {
      if (
        image.Memberships[i].userId === req.user.id &&
        image.Memberships[i].status === "co-host"
      ) {
        isCoHost = true;
      }
    }

    if (isCoHost || isOrganizer) {
      const destroyImage = await EventImage.findOne({
        where: {
          id: req.params.imageId,
        },
      });

      await destroyImage.destroy();

      res.status(200);
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      res.status(404);
      return res.json({
        message: "User is not organizer or co-host",
      });
    }
  } else {
    res.status(404);
    return res.json({
      message: "Event image couldn't be found",
      statusCode: 404,
    });
  }
});

module.exports = router;
