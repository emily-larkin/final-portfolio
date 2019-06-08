var express = require('express');
var router = express.Router();
var db = require('../models');

// Bcrypt==========================
var bcrypt = require('bcrypt');

var hash = '$2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT/HRM/a';

//=======================================================================================

// var redirectLogin = function (req, res, next) {
//   console.log('REDIRECT SESSION: ', req.session);
//   if (!req.session.userId) {
//     res.redirect('/signUp');
//   } else {
//     next();
//   }
// };

router.get('/', function (req, res) {
  console.log('\n\nROUTER.GET SESSION: ', req.session);
  console.log('ROUTER.GET SESSION ID: ', req.session.id);
  console.log('ROUTER.GET userId: ', req.session.userId);

  // This will load title and description for each page separately=================================
  res.locals.metaTags = {
    // eslint-disable-next-line quotes
    title: "Emily's Profile",
    description: 'Profile site',
    keywords: 'dev profile',
    bg: 'index'
  };
  res.render('index', {
    layout: 'main'
  });
});

router.get('/signUp', function (req, res) {
  // This will load title and description for each page separately=================================
  res.locals.metaTags = {
    title: 'Sign up profile',
    description: 'Sign in',
    keywords: 'sign on',
    bg: 'sign-up'
  };
  res.render('signUp', {
    layout: 'main'
  });
});

router.get('/userProfile', function (req, res) {
  console.log(req.query);
  console.log(req.query.id);
  var users = db.User.findAll({
    where: {
      id: req.query.id
    }
  });

  Promise
    .all([users])
    .then(function (responses) {
      console.log('**********COMPLETE RESULTS****************');
      console.log(responses[0]); // user profile
      res.render('userProfile', {
        users: responses[0]
      });
    })
    .catch(function (err) {
      console.log('**********ERROR RESULT****************');
      console.log(err);
    });
});

// router.get('/dashboard', redirectLogin, function (req, res) {
//   // This will load title and description for each page separately=================================
//   res.locals.metaTags = {
//     title: 'profile',
//     description: ',
//     keywords: ',
//     bg: 'dashboard'
//   };
//   res.render('dashboard', {
//     layout: 'main'
//   });
//   console.log('DASHBOARD SESSION: ', req.session);
//   console.log('DASHBOARD userId: ', req.session.userId);
//   // Here is where to push info to front-end=================================================
//   // or may have to make a post route for dashboard=========================================
// });

// Render 404 page for any unmatched routes
router.get('*', function (req, res) {
  res.render('404');
});

//========================================================================================

// login route
router.post('/api/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(password);
  console.log(email);

  console.log('\nlogin details: ' + email + ', ' + password + '\n');

  if (!email || !password) {
    console.log('No email/Pass');
    res.end();
  } else {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      // console.log('USER: ', dbUser);
      hash = dbUser.dataValues.password;
      // console.log('HASH: ', hash);
      bcrypt
        .compare(password, hash, (err, pwMatches) => {
          console.log('I','m the password manager', pwMatches);
          if (pwMatches) {
            // console.log('dbUserPassword :', dbUser.dataValues.password);
            console.log('PASSWORD MATCHES');
            req.session.userId = dbUser.dataValues.id;
            console.log('SESSION Id: ', req.session.userId);

            var userObj = {
              id: dbUser.dataValues.id,
              firstName: dbUser.dataValues.first_name,
              lastName: dbUser.dataValues.last_name,
              email: dbUser.dataValues.email,
              image: dbUser.dataValues.image
            };
            //we update the loggedIn key to have a true value. we can use this value on the fron end to see if the user is logged in or not.
            req.session.user.loggedIn = true;
            //here the session's user object is updated with the users data. we can hit our /session endpoing witha  get request from the front end and get our user object.
            req.session.user.currentUser = userObj;

            res.send({
              'code': 200,
              'success': 'Login Successful'
            });
          } else {
            console.log('PASSWORD DOES NOT MATCH');
            res.end();
          }
        });
    });
  }
});

// Logout route
router.post('/api/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
  console.log('LOGGED OUT');
});

module.exports = router;
