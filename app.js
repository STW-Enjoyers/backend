const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc"); // Documentacion Swager
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const apiRouter = require('./app_api/routes/index');
require("./config/passport");
require('./app_api/models/db');


var app = express();

// swagger definition
var swaggerDefinition = {
  info: {
    title: "API de gestión de recurso UnizApp",
    version: "1.0.0",
    description: "Descripción del API del servicio de UnizApp",
  },
  host: "unizapp-backend-dev", // Tiene que coincidir con puerto del servidor
  basePath: "/api/",
  schemes: ["http"],
};
// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./app_api/routes/*.js"], // Coincide con ruta a routes
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "jade");

// Cualquier peticion se loggea
app.use(logger("dev"));
// Cualquier peticion se convierte a JSON
app.use(express.json());
// Codificar la URL
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors()); // TODO: Necesario
app.use(passport.initialize());

// Define el directorio statico, lo que hay dentro se sirve tal cual
app.use(express.static(path.join(__dirname, "public")));

// Peticiones sobre api
app.use("/api", apiRouter);

app.use(express.static("public"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
