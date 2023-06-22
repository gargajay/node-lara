const jwt = require('jsonwebtoken');
const config = require('../../../config/app');

const authMiddleware = (req, res, next) => {
  // Check for token in the request headers
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach the user object to the request
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
