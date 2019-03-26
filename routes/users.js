const express = require('express');
const router = express.Router();

const User = require('../models').User;
const passport = require('passport');
require('../config/passport.js')(require('passport'), User);

const usersController = require('../controllers').users;

router.get('/', usersController.index);
router.get('/new', usersController.new);
router.get('/signin', usersController.signin);

router.post('/create', passport.authenticate('local-signup', {
  successRedirect: '/users',
  failureRedirect: 'new'
}));

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: 'signin'
}));

router.get('/signout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
