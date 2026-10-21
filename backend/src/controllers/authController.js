const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    //create this if condition in utils functions, more
    if (!firstName || !lastName) {
      throw new Error("write suitable name");
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).send("User created successfully!");
  } catch (err) {
    res.status(500).send("Internal server error : " + err.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User is not Available please register");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Paasword Or email is not Correct");
    } else {
      var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.send("user login successfully!");
    }
  } catch (err) {
    res.status(500).send("Internal server error : " + err.message);
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal server error : " + err.message);
  }
};

module.exports = { register, signIn, profile };
