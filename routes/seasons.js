const express = require('express');
const router = express.Router();
const seasonsController = require('../controllers').seasons;


router.get('/associations/:associationId', seasonsController.index);
router.get('/associations/:associationId/new', seasonsController.new);
router.post('/', seasonsController.create);
router.get('/:id', seasonsController.show);

module.exports = router;
