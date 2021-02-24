import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import User from "../models/User.js";

//Middleware per consentire accesso a Route Private per cui serve un JWT Token
export const authRouteValidator = asyncErrorHandler(async (req, res, next) => {
  let token;
  //   console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new ErrorResponse("Accesso non consentito", 401));
  }

  if (!token) {
    return next(new ErrorResponse("Accesso non consentito", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Accesso non consentito", 401));
  }
});
