require("dotenv").config();
var express = require("express");
var app = express();
var helmet = require("helmet");
var exphbs = require("express-handlebars");
var session = require("express-session");

var PORT = process.env.PORT || 3000;

var db = require("./models");

// Login Routes
var loginRouter = require("./routes/loginRoutes");

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

// Sets cookies to secure https when in production, 
// but not in development
// var secureCookie = false;
// if (process.env.NODE_ENV === "production") {
//   secureCookie = true;
// }
// app.use(session({
//   secret: "jnI67r12gfJH79Greb0EmnObvesk5J98HgfG",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000 * 60 * 60,
//     sameSite: true,
//     secure: secureCookie
//   }
// }));

function userSetup(req, res, next) {
  if (!req.session.user) {
    req.session.user = {};
    // req.session.user.loggedIn = false;
  }
  next();
}
//using middlewhere acrossed the entire application before any route gets hit.
app.use(userSetup);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// route to handle user registration
app.use("/", loginRouter);

// Routes
require("./routes/userRoutes")(app);


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
