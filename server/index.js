require("dotenv").config();

console.log("DB loaded:", !!process.env.DB);
console.log("JWT Private Key loaded:", !!process.env.JWTPRIVATEKEY);
console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const createWebSocketServer = require("./wsServer.js");

// Database
connection();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:4000",
  "https://swifty-chatty-appy.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Serve frontend production build
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Frontend fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "frontend", "dist", "index.html"),
    (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
    }
  );
});

// Start server
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Application Running on Port ${port}`);
});

// WebSocket
createWebSocketServer(server);