const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const associationsRouter = require('./routes/associations');
const seasonsRouter = require('./routes/seasons');

const app = express();

// view engine setup
app.engine('mst', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mst');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (req.isAuthenticated() || req.path == "/users/signin" || req.path == "/test")
    next();
  else
    res.redirect('/users/signin');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/associations', associationsRouter);
app.use('/seasons', seasonsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
