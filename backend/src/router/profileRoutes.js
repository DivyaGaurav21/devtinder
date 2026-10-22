const express = require("express");

const {
  profileView,
  profileEdit,
  forgotPassword
} = require("../controllers/profileController");
const { userAuth } = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, profileView);
profileRouter.patch("/profile/edit", userAuth, profileEdit);
profileRouter.patch("/profile/forgotPassword", userAuth, forgotPassword);

module.exports = profileRouter;
