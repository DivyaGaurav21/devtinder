const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");

const profileView = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal server error : " + err.message);
  }
};

const profileEdit = async (req, res) => {
  try {
    validateEditProfileData(req);
    const loggeInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggeInUser[key] = req.body[key];
    });
    await loggeInUser.save();
    const user = await User.findById(req.user._id);
    res.json({
      message: `Hey ${req.user.firstName}, Your Profile is Updated!`,
      user,
    });
  } catch (err) {
    res.status(500).send("Internal server error : " + err.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required",
      });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }
    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please check your email.",
      });
    }
    // 3. Hash new password
    const hashPassword = await bcrypt.hash(newPassword, 10);
    // 4. Update password
    user.password = hashPassword;
    await user.save();

    // 5. Send response
    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error: " + err.message,
    });
  }
};

module.exports = { profileView, profileEdit, forgotPassword };
