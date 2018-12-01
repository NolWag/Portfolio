var express = require("express");
var passport = require("passport");
var axios = require('axios');

var Behance = require("node-behance-api");
var behance = new Behance({"client_id": "YsLIhxH7ivgPvv9trvfgn6mxQ53MXzHC"})
Behance.initOptions();

var User = require("./models/user");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in to see this page.");
    res.redirect("/login");
  }
}

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", function(req, res, next) {
  // User.find()
  // .sort({ createdAt: "descending" })
  // .exec(function(err, users) {
  //   if (err) { return next(err); }
  //   res.render("index", { users: users });
  // });
    //   behance.get({
    //     api: Behance.APIS.GET_USER_PRODUCT,
    //     params: { //or simply behance.get('user',
    //         user:'nolanwagner'
    //     }
    // }, function (error, result) {
    //     if (error)
    //         console.log(error)
    //     else
    //         res.render('index', { data: result });
    //         console.log(result);
    // });

    axios.get('https://www.behance.net/v2/users/nolanwagner/projects/4889175?api_key=' + 'APIKEY')
    .then(function(response) {
      console.log(response.data.projects)
      res.render('index', { response: response.data.projects })
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);

  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render("profile", { user: user });
  });
});

router.get("/edit", ensureAuthenticated, function(req, res) {
  res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req, res, next) {
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save(function(err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Profile updated!");
    res.redirect("/edit");
  });
});

module.exports = router;
