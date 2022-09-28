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
const user = require("../../db/models/user");

const router = express.Router();

// Get all attendees of an Event specified by its id
router.get("/:eventId/attendees", async (req, res, next) => {
  // check if current user is organizer or co-host, show all attendees
  // if not, show all excpet pending attendees

  const findAttendees = await Event.findOne({
    where: {
      id: req.params.eventId,
    },
    include: [
      {
        model: Attendance,
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
      {
        model: Group,
      },
    ],
  });

  if (!findAttendees) {
    res.status(404);
    return res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  let event = findAttendees.toJSON();

  let isOrganizer = false;
  if (event && req.user.id === event.Group.organizerId) {
    isOrganizer = true;
  } else if (event && event.Attendances.length) {
    let isCoHost = false;
    event.Attendances.forEach((attendee) => {
      if (req.user.id === attendee.userId && attendee.status === "co-host") {
        isCoHost = true;
      }
    });
  }

  if (isOrganizer || isCoHost) {
    // can see all attendees
    let Attendees = [];
    event.Attendances.forEach((attendee) => {
      let obj = {};
      obj.id = attendee.User.id;
      obj.firstName = attendee.User.firstName;
      obj.lastName = attendee.User.lastName;
      obj.Attendance = { status: `${attendee.status}` };
      Attendees.push(obj);
    });

    return res.json({ Attendees });
  } else {
    // can see attendees minus pending
    let Attendees = [];
    event.Attendances.forEach((attendee) => {
      if (attendee.status !== "pending") {
        let obj = {};
        obj.id = attendee.User.id;
        obj.firstName = attendee.User.firstName;
        obj.lastName = attendee.User.lastName;
        obj.Attendance = { status: `${attendee.status}` };
        Attendees.push(obj);
      }
    });

    return res.json({ Attendees });
  }
});

// Add an image to a Event based on the Event's id
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
  // User must be an attendee, host, or co-host of the event
  const findEvent = await Event.findOne({
    where: {
      id: req.params.eventId,
    },
    include: [
      {
        model: Attendance,
        attributes: ["eventId", "userId", "status"],
      },
    ],
  });

  if (!findEvent) {
    res.status(404);
    return res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  } else {
    let event = findEvent.toJSON();

    let isValidUser = false;
    event.Attendances.forEach((attendance) => {
      console.log(attendance);
      if (
        req.user.id === attendance.userId &&
        (attendance.status === "member" ||
          attendance.status === "host" ||
          attendance.status === "co-host")
      ) {
        isValidUser = true;
      }
    });

    if (isValidUser) {
      const { url, preview } = req.body;

      const newEventImage = await EventImage.create({
        eventId: req.params.eventId,
        url,
        preview,
      });

      return res.json({
        id: newEventImage.id,
        url: newEventImage.url,
        preview: newEventImage.preview,
      });
    }
  }
});

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
        attributes: ["eventId", "userId", "status"],
      },
      { model: EventImage, attributes: ["url"] },
      { model: Group, attributes: ["id", "name", "city", "state"] },
      { model: Venue, attributes: ["id", "city", "state"] },
    ],
  });

  allEvents.forEach((event) => {
    let obj = event.toJSON();
    let a = {};
    a.id = obj.id;
    a.groupId = obj.groupId;
    a.venueId = obj.venueId;
    a.name = obj.name;
    a.type = obj.type;
    a.startDate = obj.startDate;
    a.endDate = obj.endDate;
    a.numAttending = obj.Attendances.length;
    if (obj.EventImages.length) {
      a.previewImage = obj.EventImages[0].url;
    } else {
      a.previewImage = "no image";
    }
    a.Group = obj.Group;
    if (obj.Venue) {
      a.Venue = obj.Venue;
    } else {
      a.Venue = null;
    }

    Events.push(a);
  });

  res.json({ Events });
});

module.exports = router;
