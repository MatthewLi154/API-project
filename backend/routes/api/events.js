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
  Venue,
  Attendance,
  Event,
  EventImage,
  sequelize,
  Sequelize,
} = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
const { Op, json } = require("sequelize");
const e = require("express");

const router = express.Router();

// Get all events
router.get("/", async (req, res, next) => {
  let Events = [];

  const allEvents = await Event.findAll({
    include: [
      {
        model: Attendance,
      },
      { model: EventImage, attributes: ["url"] },
      { model: Group, attributes: ["id", "name", "city", "state"] },
      { model: Venue },
    ],
  });

  allEvents.forEach((event) => {
    let eventObj = {};
    eventObj.id = event.id;
    eventObj.groupId = event.groupId;
    eventObj.venueId = event.venueId;
    eventObj.name = event.name;
    eventObj.type = event.type;
    eventObj.startDate = event.startDate;
    eventObj.endDate = event.endDate;
    eventObj.numAttending = event.Attendances.length;
    eventObj.previewImage = event.EventImages[0].url;
    eventObj.Group = event.Group.dataValues;
    Events.push(eventObj);
  });

  res.json({ Events });
});

module.exports = router;
