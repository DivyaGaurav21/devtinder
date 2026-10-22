const express = require("express");


const { userAuth } = require("../middleware/auth");
const { sendConnectionRequest } = require("../controllers/requestController");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, sendConnectionRequest);

module.exports = requestRouter;
