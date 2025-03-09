require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //Allow requests from this origin.
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //Allow these methods.
    allowedHeaders: ["Content-Type", "Authorization"], //Allow these headers.
    credentials: true, //Allow cookies to be sent.
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
