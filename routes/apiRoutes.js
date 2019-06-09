// ===============================================================================
// LOAD DATA
// ===============================================================================

var userData = require("../data/userData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/users", function(req, res) {
    res.json(userData);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  // app.post("/api/users", function(req, res) {

  // });

};
