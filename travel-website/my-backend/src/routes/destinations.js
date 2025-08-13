const express = require('express');
const { getDestinations, createDestination } = require('../controllers/destinationController');
const router = express.Router();

router.get('/', getDestinations);
router.post('/', createDestination);

module.exports = router;