const express = require('express');
const bCrypt = require('bcrypt-nodejs');

const router = express.Router();
const usersController = require('../controllers').users;

const User = require('../models').User;
const passport = require('passport');

require('../config/passport.js')(passport, User);

router.get('/', isLoggedIn, usersController.index);
router.get('/new', usersController.new);
router.get('/signin', usersController.signin);

router.post('/add', passport.authenticate('local-signup', {
  successRedirect: '/users',
  failureRedirect: 'new'
}));

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: 'signin'
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('users/signin');
}

module.exports = router;
