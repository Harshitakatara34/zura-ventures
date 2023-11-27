const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(400).send({
        msg: "No token found",
      });
    }

    const decoded = jwt.verify(token, "harshi");
    req.email = decoded.email;

    next();
  } catch (error) {
    return res.status(500).send({
      msg: "Something went wrong ",
      error: error.message,
    });
  }
};

module.exports = { AuthMiddleware };
