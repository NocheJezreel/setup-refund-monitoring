const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const cors = require("cors");
const authorRoutes = require("./routes/author");

const app = express();
const dbCloudUrl = "mongodb+srv://jezreelnoche16:freakowl143@refund.gcp5q8w.mongodb.net/Cummulative?retryWrites=true&w=majority&appName=Refund";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbCloudUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use("/.netlify/functions/api", authorRoutes);

module.exports.handler = serverless(app);
