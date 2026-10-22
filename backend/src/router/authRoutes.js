const express = require("express");
const { register, signIn, logout } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);

module.exports = authRouter;
