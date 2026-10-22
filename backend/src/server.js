const express = require("express");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authRoutes");
const profileRouter = require("./router/profileRoutes");
const requestRouter = require("./router/request");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);


app.use("/api/user", profileRouter);


app.use("/api/user", requestRouter);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
