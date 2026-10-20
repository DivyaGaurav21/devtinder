const express = require("express");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const connectDB = require("./config/database");
const authRoutes = require("./router/authRoutes");
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser);

app.use("/api/auth", authRoutes);

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
