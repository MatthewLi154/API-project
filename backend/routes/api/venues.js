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

// Edit a Venue specified by its id
router.put("/:venueId", async (req, res, next) => {
  // check if venueId exists
  const checkVenue = await Venue.findOne({
    where: {
      id: req.params.venueId,
    },
  });

  if (!checkVenue) {
    res.status(404);
    return res.json({
      message: "Venue couldn't be found",
      statusCode: 404,
    });
  } else {
    // check if current user is owner or cohost of group
    console.log(req.user.toJSON());

    // get Venue
    const getVenue = await Venue.findOne({
      where: {
        id: req.params.venueId,
      },
    });

    console.log("Venue:", getVenue.toJSON());

    // check if current user is owner of group with matching groupId
    //   console.log("Get Venue From Id", getVenue.toJSON());
    let groupOwner;

    const checkGroupOwner = await Group.findAll({
      where: {
        organizerId: req.user.id,
      },
      include: [
        {
          model: Venue,
        },
      ],
    });

    let userOwnedGroups = [];
    checkGroupOwner.forEach((group) => {
      if (group.organizerId === req.user.id) {
        userOwnedGroups.push(group.toJSON());
        //   console.log(group);
      }
    });

    //   console.log("Current owns these groups", userOwnedGroups);

    if (userOwnedGroups.length) {
      groupOwner = true;
    }

    //   console.log(groupOwner);

    // check if current user is a co-host
    const checkMembership = await Membership.findAll({
      where: {
        groupId: getVenue.toJSON().groupId,
      },
    });

    let isCoHost = false;
    checkMembership.forEach((membership) => {
      console.log(membership.toJSON());
      let memb = membership.toJSON();
      if (req.user.id === memb.userId && memb.status === "co-host") {
        isCoHost = true;
      }
    });

    if (isCoHost || groupOwner) {
      // Verified co-host or owner
      const { address, city, state, lat, lng } = req.body;
      console.log("VENUE", getVenue.toJSON());
      getVenue.update({
        address,
        city,
        state,
        lat,
        lng,
      });
      return res.json({
        id: getVenue.id,
        groupId: getVenue.groupId,
        address: getVenue.address,
        city: getVenue.city,
        state: getVenue.state,
        lat: getVenue.lat,
        lng: getVenue.lng,
      });
    } else {
      return res.json({
        message: "User is not owner or co-host!",
      });
    }

    return res.json(userOwnedGroups);
  }
});

module.exports = router;
