// PRIVATE ROUTE MIDDLEWARE

const config = require("config");
const jwt = require("jsonwebtoken");

// middleware - req, res, next
function auth(req, res, next) {
  let secret =
    process.env.NODE_ENV === "production"
      ? process.env.jwtSecret
      : config.get("jwtSecret");
  //get token from header values
  const token = req.header("x-auth-token");

  // 401 Unauthorized
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // verify the token
    const decoded = jwt.verify(token, secret);

    // get the user from the payload, put it in the request value
    req.user = decoded;

    // call next piece of middleware
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
