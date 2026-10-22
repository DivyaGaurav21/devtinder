const sendConnectionRequest = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal server error : " + err.message);
  }
};

module.exports = { sendConnectionRequest };
