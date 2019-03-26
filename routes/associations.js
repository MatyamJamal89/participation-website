const express = require('express');
const router = express.Router();
const associationsController = require('../controllers').associations;

router.get('/', associationsController.index);
router.get('/new', associationsController.new);
router.post('/create', associationsController.create);
router.get('/:id', associationsController.show);

module.exports = router;
