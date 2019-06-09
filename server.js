require("dotenv").config();
var express = require("express");
var app = express();
var helmet = require("helmet");
var exphbs = require("express-handlebars");
var session = require("express-session");

var PORT = process.env.PORT || 3000;

var db = require("./models");

app.get("/", function(req, res) {
    res.send("Profile page");
  });

// Middleware
app.use(helmet());
app.use(express.urlencoded({
  extended: true
})
);
app.use(express.json());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Sessions ===============================================
app.use(session({
  secret: process.env.SESSIONSECRET || "cat",
  resave: false,
  saveUninitialized: true
}));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// route to handle user registration
// app.use("/", loginRouter);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "development") {
  syncOptions.force = true;
}

// // Timeout
// app.use(timeout(15000));
// app.use(haltOnTimedout);

// function haltOnTimedout(req, res, next) {
//   if (!req.timedout) {next();
//   }
// }

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
