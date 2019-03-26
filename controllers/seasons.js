const Season = require('../models').Season;

module.exports = {
  index(req, res) {
    Season.findAll().then((seasons) => {
      res.render('seasons/index', {
        seasons: seasons,
        AssociationId: req.params.associationId,
        messages: req.flash()['messages'],
      })
    });
  },

  new(req, res) {
    res.render('seasons/new', {
      title: "أضف موسم جديدة",
      associationId: req.params.associationId
    })
  },

  create(req, res) {
    const data = {
      name: req.body.name,
    };

    Season.create(data).then(function (newSession, created) {
      newSession.setAssociations([req.body.associationId]);
      res.redirect('/associations/' + req.body.associationId);
    });
  },

  show(req, res) {
    const id = req.params.id;

    Season.findById(id).then(function (season) {
      res.render("seasons/show", {
        title: season.name,
        season: season,
      })
    });
  }
}
