const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization

    if (!token) {
      return res.status(401).json({ error: "Authorization denied, Token Not Present" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
    
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authHandler;
