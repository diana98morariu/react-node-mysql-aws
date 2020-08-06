//route class
const express = require("express");
const app = express();

// router files
const usersRoutes = require("./api/users");
const propertiesRoutes = require("./api/properties");

// include the routes to express
app.use("/users", usersRoutes);
app.use("/properties", propertiesRoutes);

//export the file so it's used in server.js
module.exports = app;
