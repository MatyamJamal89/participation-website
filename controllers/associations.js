const Association = require('../models').Association;
const Season = require('../models').Season;

module.exports = {
  index(req, res) {
    Association.findAll().then((associations) => {
      res.render('associations/index', {
        associations: associations,
        title: "الرابطات",
        messages: req.flash()['messages'],
      })
    });
  },

  new(req, res) {
    Season.findAll().then((seasons) => {
      res.render('associations/new', {
        title: "أضف رابطة جديدة",
        seasons: seasons,
      });
    });
  },

  create(req, res) {
    const data = {
      name: req.body.name,
      archived: req.body.archived,
    };

    Association.create(data).then(function (newAssociation, created) {
      newAssociation.setSeasons(req.body.seasons);

      res.redirect('/associations');
    });
  },

  show(req, res) {
    const id = req.params.id;

    Association.findByPk(id, {
      include: [{
        model: Season,
      }]
    }).then(function(association) {
      res.render("associations/show", {
        title: association.name,
        association: association,
      })
    });
  }
}
