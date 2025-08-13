// Dummy middleware for demonstration
function protect(req, res, next) {
  // Add authentication logic here
  next();
}

module.exports = { protect };