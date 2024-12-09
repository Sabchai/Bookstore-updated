const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('Decoded user:', user);  
    req.user = user;
    next();
  });
};

module.exports = verifyAdminToken;
