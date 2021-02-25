import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import User from "../models/User.js";

//Middleware per consentire accesso a Route Private per cui serve un JWT Token
export const authRouteValidator = asyncErrorHandler(async (req, res, next) => {
  let token;
  //   console.log(req.headers.authorization);

  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) ||
    req.cookies.token
  ) {
    token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.cookies.token;
  } else {
    return next(new ErrorResponse("Accesso non consentito", 401));
  }

  //authorization potrebbe avere solo Bearer all'inizio. Provo a riassegnarlo con un cookies
  if (!token) {
    if (!req.cookies.token) {
      return next(new ErrorResponse("Accesso non consentito", 401));
    } else {
      token = req.cookies.token;
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Accesso non consentito", 401));
  }
});

export const adminValidator = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.isAdmin) {
    return next();
  } else {
    return next(new ErrorResponse("Funzione Riservata agli admin"));
  }
});
