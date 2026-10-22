const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid : " + value);
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("this is not strong PassWord : " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a gender type`,
      },
    },
    photoUrl: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/59255732?v=4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("this is not valid photoURL : " + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is default about of User, not provided by User",
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("sex")) {
          throw new Error("invalid about!");
        }
      },
    },
    skill: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
