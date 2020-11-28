require("dotenv").config();
const JWT = require("../config/JWT");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const decoded = await JWT.verify(res, authHeader, process.env.AUTH_USER || '0a3ccfe0f3385d22f6ca450f00a4d97e');

  req.userPayload = decoded;

  return next();
};
