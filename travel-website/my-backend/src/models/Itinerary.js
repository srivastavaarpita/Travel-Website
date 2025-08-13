const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  startDate: Date,
  endDate: Date,
  notes: String
});

module.exports = mongoose.model('Itinerary', itinerarySchema);