const bCrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, user) {
  var User = user;

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });


  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (user) {
          req.flash('errors', 'تم حجز البريد الالكتروني بالفعل');
          return done(null, false);
        } else {
          const data = {
            email: email,
            password: generateHash(password),
            name: req.body.name,
            role: req.body.role,
            AssociationId: req.body.association,
          };

          User.create(data).then(function (newUser, created) {
            if (!newUser) {
              req.flash('errors', 'حدث خطأ أثناء محاولة إضافة المستخدم');
              return done(null, false);
            }
            if (newUser) {
              req.flash('messages', 'تمّ إضافة المستخدم بنجاح');
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));

  // Signin

  passport.use('local-signin', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req, email, password, done) {
      console.log({
        email
      });
      console.log({
        password
      });

      const User = user;

      const isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }

      User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {

        if (!user) {
          return done(null, false, {
            message: 'Email does not exist'
          });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });

        }

        const userinfo = user.get();
        return done(null, userinfo);

      }).catch(function (err) {
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));
}
