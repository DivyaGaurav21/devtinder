const express = require("express");
const { register, signIn, profile } = require("../controllers/authController");
const { userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", signIn);
router.get("/profile", userAuth, profile);

module.exports = router;
