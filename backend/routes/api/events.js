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

// Edit an event specified by its id
router.put("/:eventId", requireAuth, async (req, res, next) => {
  // check if event and venue exist
  const findEvent = await Event.findOne({
    where: {
      id: req.params.eventId,
    },
    include: [
      {
        model: Venue,
      },
      {
        model: Group,
        include: [
          {
            model: Membership,
          },
        ],
      },
    ],
  });

  let obj = findEvent.toJSON();
  console.log(findEvent.toJSON());

  if (!findEvent.id) {
    res.status(404);
    return res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  } else if (!findEvent.venueId) {
    res.status(404);
    return res.json({
      message: "Venue couldn't be found",
      statusCode: 404,
    });
  } else {
    // Current user must be the organizer of the group or "cohost" of the group
    // Check if current user if organizer
    let groupOwner = false;
    if (req.user.id === obj.Group.organizerId) {
      groupOwner = true;
    }

    // Check if current user is co-host
    let isCoHost = false;
    obj.Group.Memberships.forEach((membership) => {
      if (
        req.user.id === membership.userId &&
        membership.status === "co-host"
      ) {
        isCoHost = true;
      }
    });

    if (groupOwner || isCoHost) {
      // Verified, update the event with req.body
      const {
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
      } = req.body;

      findEvent.update({
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
      });

      console.log("Updated findEvent", findEvent);

      return res.json({
        id: findEvent.id,
        groupId: findEvent.groupId,
        venueId: findEvent.venueId,
        name: findEvent.name,
        type: findEvent.type,
        capacity: findEvent.capacity,
        price: findEvent.price,
        description: findEvent.description,
        startDate: findEvent.startDate,
        endDdte: findEvent.endDate,
      });
    } else {
      res.json({
        message: "Not owner or co-host",
      });
    }
  }
});

// Get details of an Event specified by its id
router.get("/:eventId", async (req, res, next) => {
  const eventById = await Event.findOne({
    where: {
      id: req.params.eventId,
    },
    include: [
      {
        model: Attendance,
        attributes: [
          [sequelize.fn("count", sequelize.col("userId")), "numAttending"],
        ],
      },
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "address", "city", "state", "lat", "lng"],
      },
      {
        model: EventImage,
        attributes: ["id", "url", "preview"],
      },
    ],
  });

  if (!eventById.toJSON().id) {
    res.status(404);
    return res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  let event = eventById.toJSON();
  event.numAttending = eventById.toJSON().Attendances[0].numAttending;

  console.log(event);

  return res.json({
    id: event.id,
    groupId: event.groupId,
    venueId: event.venueId,
    name: event.name,
    description: event.description,
    type: event.type,
    capacity: event.capacity,
    price: event.price,
    startDate: event.startDate,
    endDate: event.endDate,
    numAttending: event.numAttending,
    Group: event.Group,
    Venue: event.Venue,
    EventImages: event.EventImages,
  });
});

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
