const bCrypt = require('bcrypt-nodejs');

const User = require('../models').User;

module.exports = {
  index(req, res) {
    User.findAll().then((users) => {
      console.log(users);
      res.render('users/index', {
        users: users,
        title: "مستخدمي النّظام",
        messages: req.flash()['messages'],
      })
    });
  },
  new(req, res) {
    res.render('users/new', {
      title: "إضافة مستخدم جديد",
      errors: req.flash()['errors'],
    });
  },
  create(req, res) {
    const generateHash = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    User.findOne({
      where: {
        email: req.body.email,
      }
    }).then(function (user) {
      if (user) {
        req.flash('errors', 'تم حجز البريد الالكتروني بالفعل');
        res.redirect('/users/new');
      } else {
        const data = {
          email: req.body.email,
          password: generateHash(req.body.password),
          name: req.body.name,
          type: req.body.type,
        };

        User.create(data).then(function (newUser, created) {
          if (!newUser) {
            req.flash('errors', 'حدث خطأ أثناء محاولة إضافة المستخدم');
            res.redirect('/users/new');
          }
          if (newUser) {
            req.flash('messages', 'تمّ إضافة المستخدم بنجاح');

            res.redirect('/users');
          }
        });
      }
    });
  },

  signin(req, res) {
    res.render('users/signin', {
      title: "تسجيل الدخول",
      errors: req.flash()['errors'],
    });
  },
};
