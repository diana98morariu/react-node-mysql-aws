//route class
const express = require("express");
const app = express();

const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);

//for JSon
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use(express.static("build"));

//router files
const apiRoutes = require("./routes/api");

//knex and objections
const Knex = require("knex");
const knexFile = require("./knexfile");
const knex = Knex(knexFile.development);

const { Model } = require("objection");

Model.knex(knex);

const store = new KnexStore({ knex });
// Limit the amount of requests on the auth routes
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 4 requests per windowMs
});

app.use(
  session({
    secret: "very nice secret",
    name: "user_sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000 * 600000,
    },
    store: store,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "POST,GET,OPTIONS,PUT,DELETE, PATCH"
  );
  next();
});

//include the routes to express
app.use("/api", apiRoutes, authLimiter);
app.use("/forgottenPassword", authLimiter);
app.use("/reset", authLimiter);

app.get("*", (req, res) => {
  res.sendFile("/build/index.html", { root: __dirname });
});

//error handling
const { errorHandler } = require("./helpers/errors");
app.use((err, req, res, next) => {
  errorHandler(err, res);
});

//start the server
const port = process.env.PORT || 9090;
const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error running express");
  }
  console.log("Server is running on port", server.address().port);
});
