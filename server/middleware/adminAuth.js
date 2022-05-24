const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index.js");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const err = new UnauthenticatedError("Authentication Invalid");
    next(err);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { adminId: payload.adminId };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminAuth;
