const express = require('express');
const router = express.Router();
// Add itinerary controller functions as needed

router.get('/', (req, res) => res.json({ message: 'Itinerary route' }));

module.exports = router;