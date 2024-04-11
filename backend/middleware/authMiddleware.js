const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({ message: "Invalid authorizaton" });
  }

  const [bearer, token] = authHeader.split(" ");

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "invalid authorization" });
    }
    req.userId = decode.userId;
    next();
  });
};

module.exports = authMiddleware;
