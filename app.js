require("./config/config");
require("./models/db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const rIndex = require("./routes/index.router");

var app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", rIndex);

//error
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

//start
app.listen(process.env.PORT, () =>
  console.log(`Server started, PORT: ${process.env.PORT}`)
);
