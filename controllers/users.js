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
    });
  },

  signin(req, res) {
    res.render('users/signin', {
      title: "تسجيل الدخول",
      errors: req.flash()['errors'],
    });
  },
};
