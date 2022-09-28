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

// Create an Event for a Group specified by its id
router.post("/:groupId/events", requireAuth, async (req, res, next) => {
  const findGroup = await Group.findOne({
    where: {
      id: req.params.groupId,
    },
    include: [
      {
        model: Membership,
        attributes: ["groupId", "userId", "status"],
      },
    ],
  });

  // Group does not exist, return error
  if (!findGroup) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  // console.log(findGroup);
  let group = findGroup.toJSON();

  // Current user must be the organizer of the group or a co-host of the group
  // check if owner
  let groupOwner = false;
  if (req.user.id === group.organizerId) groupOwner = true;

  // check if cohost
  let isCoHost = false;
  group.Memberships.forEach((membership) => {
    if (req.user.id === membership.userId && membership.status === "co-host") {
      isCoHost = true;
    }
  });

  if (groupOwner || isCoHost) {
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

    const newEvent = await Event.create({
      groupId: req.params.groupId,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    });
    return res.json(newEvent);
  } else {
    return res.json({
      message: "User is not owner or co-host",
    });
  }
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
      if (singleEvent.EventImages.length) {
        eventsObj.previewImage = singleEvent.EventImages[0].url;
      } else {
        eventsObj.previewImage = null;
      }
      eventsObj.Group = singleEvent.Group;
      eventsObj.Venue = singleEvent.Venue;
      Events.push(eventsObj);
    });
  });

  return res.json({ Events });
});

// Add an image to a gorup based on the group's id
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
  // Current user must be the organizer of the group
  // Check if user is organizer of group
  const findGroup = await Group.findOne({
    where: {
      id: req.params.groupId,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  let group = findGroup.toJSON();

  if (!findGroup) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  if (req.user.id !== group.organizerId) {
    return res.json({
      message: "Not group organizer",
    });
  }

  const { url, preview } = req.body;

  const newGroupImage = await GroupImage.create({
    groupId: req.params.groupId,
    url,
    preview,
  });

  return res.json({
    id: newGroupImage.id,
    url: url,
    preview: preview,
  });
});

// Delete an existing group
router.delete("/:groupId", requireAuth, async (req, res, next) => {
  // find group
  // check if group belongs to current user
  const findGroup = await Group.findOne({
    where: {
      id: req.params.groupId,
    },
  });

  if (!findGroup) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  let group;
  if (findGroup) {
    group = findGroup.toJSON();
    console.log(group);

    if (group.organizerId !== req.user.id) {
      return res.json({
        message: "Group does not belong to current user",
      });
    }

    // delete group
    await findGroup.destroy();

    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
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

// Create a new Venue for a Group specified by its id
router.post("/:groupId/venues", async (req, res, next) => {
  // Only the owner of the group or a member of the group with a membership status of "co-host" is authorized to create a venue
  // check if user is authorized by matching groupId's membership
  // console.log("Current User:", req.user.toJSON());

  // Check if group exists
  const findGroup = await Group.findOne({
    where: {
      id: req.params.groupId,
    },
  });

  if (!findGroup) {
    res.status(404);
    return res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else {
    // Check if current user is a member of group
    const checkMembership = await Membership.findOne({
      where: {
        groupId: req.params.groupId,
      },
      include: [
        {
          model: User,
          where: {
            id: req.user.id,
          },
          attributes: ["id"],
        },
      ],
    });
    if (checkMembership)
      console.log("checkMembership", checkMembership.toJSON());

    const checkGroupOwner = await Group.findAll({
      where: {
        id: req.params.groupId,
      },
    });

    // if (checkMembership) console.log(checkMembership.toJSON());

    let groupOwner;
    if (checkGroupOwner) {
      checkGroupOwner.forEach((group) => {
        if (group.toJSON().organizerId === req.user.id) {
          groupOwner = true;
        }
      });
    }

    // console.log("Group Owner:", groupOwner);

    if (
      (checkMembership && checkMembership.status === "co-host") ||
      groupOwner === true
    ) {
      // Create the venue!
      const { address, city, state, lat, lng } = req.body;
      const newVenue = await Venue.create({
        groupId: req.params.groupId,
        address,
        city,
        state,
        lat,
        lng,
      });

      console.log(newVenue.toJSON());

      return res.json({
        id: newVenue.id,
        groupId: req.params.id,
        address: newVenue.address,
        city: newVenue.city,
        state: newVenue.state,
        lat: newVenue.lat,
        lng: newVenue.lng,
      });
    } else {
      return res.json({
        message: "You are not organizer or co-host for this group",
      });
    }
  }
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

  if (!findVenueByGroup) {
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
