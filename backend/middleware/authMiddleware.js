const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
require("dotenv").config();  // To use environment variables
const JWT_SECRET = process.env.JWT_SECRET || "avinash";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user id
      const decoded = jwt.verify(token, JWT_SECRET);

      // Fetch the user based on the id in the token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found, not authorized");
      }

      next();
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
