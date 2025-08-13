const Destination = require('../models/Destination');

exports.getDestinations = async (req, res) => {
  const destinations = await Destination.find();
  res.json(destinations);
};

exports.createDestination = async (req, res) => {
  const { name, description, location, image } = req.body;
  const destination = new Destination({ name, description, location, image });
  await destination.save();
  res.status(201).json(destination);
};