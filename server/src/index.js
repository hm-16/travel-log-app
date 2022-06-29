/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan"); /* tool for debugging,it will log all the requests made to server. */
const helmet = require("helmet"); /* removes headers which contains critical information about our app.Also adds few headers. */
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use('/api/logs',logs);

/* middleware to handel 'not found' / invalid url request */
app.use(middlewares.notFound);

/* middleware to handel general error */
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`On port : ${port}`);
});
