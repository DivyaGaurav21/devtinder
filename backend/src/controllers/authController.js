const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    //create this if condition in utils functions, more
    if(!firstName || !lastName){
      throw new Error("write suitable name")
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
    const {email , password} = req.body;
    const user =await User.findOne({email});
    if(!user){
      throw new Error("User is not Available please register");
    }

    
    const isUserInDB = await bcrypt.compare(password , user.password);
    if(!isUserInDB){
      throw new Error("Paasword Or email is not Correct")
    }else{
      res.send("user login successfully!")
    }
  } catch (err) {
    res.status(500).send("Internal server error : "+ err.message);
  }
};

module.exports = { register, signIn };
