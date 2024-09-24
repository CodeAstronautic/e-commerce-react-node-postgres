const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(403).json({ error: 'Token is required.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("token",token)
      console.error('JWT verification error:', err); // Log the error for debugging
      return res.status(401).json({ error: 'Invalid token.' });
    }
    
    req.user = decoded; // Attach decoded token to the request
    next(); // Call the next middleware
  });
};
