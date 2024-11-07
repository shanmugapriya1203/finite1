import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";

dotenv.config();

const port = 3000;
const app = express();

app.use(bodyparser.json());

// Import your routes
import userRoutes from "./src/routes/userRoutes.js";

// Set up request rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: "Too many requests from this IP, please try again after 15 minutes",
// });

// // Apply the rate limit to all requests
// app.use(limiter);

// Database connection
const DB_URI = process.env.MONGODB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Mongoose default connection is done");
  })
  .catch((err) => {
    console.log(err);
  });

// Define routes
app.use("/api/users", userRoutes);

// Start server
try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}
