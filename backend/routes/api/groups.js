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

// Get all Events of a Group specified by its id
router.get("/:groupId/events", async (req, res, next) => {
  const eventsForGroup = await Group.findAll({
    where: {
      id: req.params.groupId,
    },
    attributes: [],
    include: [
      {
        model: Event,
        attributes: [
          "id",
          "groupId",
          "venueId",
          "name",
          "type",
          "startDate",
          "endDate",
        ],
        include: [
          { model: Attendance },
          { model: EventImage },
          { model: Group, attributes: ["id", "name", "city", "state"] },
          { model: Venue, attributes: ["id", "city", "state"] },
        ],
      },
    ],
  });

  if (!eventsForGroup.length) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  let Events = [];
  eventsForGroup.forEach((event) => {
    event = event.toJSON();
    event = event.Events;
    console.log(event);
    event.forEach((singleEvent) => {
      let eventsObj = {};
      eventsObj.id = singleEvent.id;
      eventsObj.groupId = singleEvent.groupId;
      eventsObj.venueId = singleEvent.venueId;
      eventsObj.name = singleEvent.name;
      eventsObj.type = singleEvent.type;
      eventsObj.startDate = singleEvent.startDate;
      eventsObj.endDate = singleEvent.endDate;
      eventsObj.numAttending = singleEvent.Attendances.length;
      eventsObj.previewImage = singleEvent.EventImages[0].url;
      eventsObj.Group = singleEvent.Group;
      eventsObj.Venue = singleEvent.Venue;
      Events.push(eventsObj);
    });
  });

  return res.json({ Events });
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

// Get All Venues for a Group specified by its id
router.get("/:groupId/venues", async (req, res, next) => {
  const findVenueByGroup = await Group.findOne({
    where: {
      id: req.params.groupId,
    },
    attributes: [],
    include: [
      {
        model: Venue,
        attributes: ["id", "groupId", "address", "city", "state", "lat", "lng"],
      },
    ],
  });

  if (!findVenueByGroup.toJSON().Venues.length) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  return res.json(findVenueByGroup);
});

// Get all groups joined or organized by the current user
router.get("/current", async (req, res, next) => {
  let currentId = req.user.id;

  const groupByCurrent = await Group.findAll({
    where: {
      [Op.or]: [
        {
          organizerId: currentId,
        },
      ],
    },
    attributes: [
      "id",
      "organizerId",
      "name",
      "about",
      "type",
      "private",
      "city",
      "state",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: Membership,
        attributes: [
          [sequelize.fn("count", sequelize.col("userId")), "numMembers"],
        ],
      },
      {
        model: GroupImage,
        attributes: ["url"],
      },
    ],
  });

  let Groups = [];
  groupByCurrent.forEach((group) => {
    let obj = group.toJSON();
    let a = {};
    a.id = obj.id;
    a.organizerId = obj.organizerId;
    a.about = obj.about;
    a.type = obj.type;
    a.private = obj.private;
    a.city = obj.city;
    a.state = obj.state;
    a.createdAt = obj.createdAt;
    a.updatedAt = obj.updatedAt;
    a.numMembers = obj.Memberships[0].numMembers;
    a.previewImage = obj.GroupImages[0].url;

    Groups.push(a);
  });

  return res.json({ Groups });
});

// Get all Members of a Group specified by its id
router.get("/:groupId/members", async (req, res, next) => {
  let Members = [];
  let members = [];

  const membersGroup = await Group.findAll({
    where: {
      id: req.params.groupId,
    },
    include: [
      {
        model: Membership,
        include: [{ model: User }],
      },
    ],
  });

  if (!membersGroup.length) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  // To get current user object
  let currentUser = req.user.toJSON();

  let groupOrganizer = membersGroup[0].toJSON().organizerId;

  membersGroup.forEach((member) => {
    members.push(member.toJSON());
  });

  // console.log(members[0].Memberships);
  let membershipsForGroup = members[0].Memberships;

  membershipsForGroup.forEach((membership) => {
    if (currentUser.id === groupOrganizer) {
      let memberObj = {};
      memberObj.id = membership.userId;
      memberObj.firstName = membership.User.firstName;
      memberObj.lastName = membership.User.lastName;
      memberObj.Membership = { status: membership.status };
      Members.push(memberObj);
    } else {
      if (membership.status !== "pending") {
        let memberObj = {};
        memberObj.id = membership.userId;
        memberObj.firstName = membership.User.firstName;
        memberObj.lastName = membership.User.lastName;
        memberObj.Membership = { status: membership.status };
        Members.push(memberObj);
      }
    }
  });

  return res.json({ Members });
});

// Get details of a Group from an id
router.get("/:id", async (req, res, next) => {
  const groupById = await Group.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "organizerId",
      "name",
      "about",
      "type",
      "private",
      "city",
      "state",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: Membership,
        attributes: [
          [sequelize.fn("count", sequelize.col("userId")), "numAttending"],
        ],
      },
      {
        model: GroupImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Venue,
        attributes: ["id", "groupId", "address", "city", "state", "lat", "lng"],
      },
    ],
  });

  console.log(groupById.toJSON());

  let obj = groupById.toJSON();

  if (!obj.id) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  let group = {
    id: obj.id,
    organizerId: obj.organizerId,
    name: obj.name,
    about: obj.about,
    type: obj.type,
    private: obj.private,
    city: obj.city,
    state: obj.state,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
    numMembers: obj.Memberships[0].numAttending,
    GroupImages: obj.GroupImages,
    Organizer: obj.User,
    Venues: obj.Venues,
  };

  return res.json(group);
});

// Get all groups
router.get("/", async (req, res, next) => {
  let resArr = [];
  let resGroup = {};

  const allGroups = await Group.findAll();

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
