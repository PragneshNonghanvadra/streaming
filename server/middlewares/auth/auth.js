const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
  try {
    // extract JWT token
    const token = req.body.token || req.cookies.auth;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // verify the token
    try {
      // decoded token will be user information
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error occurred in authentication",
      error: error.message,
    });
  }
}

module.exports = { authMiddleWare };
