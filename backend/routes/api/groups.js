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

router.get("/", (req, res, next) => {
  return res.json({
    message: "route is working",
  });
});

router.post("/", async (req, res, next) => {
  const { name, about, type, city, state } = req.body;

  const newGroup = await Group.create({
    name: name,
    about: about,
    type: type,
    private: req.body.private,
    city: city,
    state: state,
  });

  return res.json(newGroup);
});

module.exports = router;
