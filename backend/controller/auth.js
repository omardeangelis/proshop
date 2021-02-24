import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";
import ErrorReponse from "../utils/ErrorResponse.js";

//desc      Creazione di un nuovo user
//Route     POST /api/auth/register
//Access    Public
export const createNewUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendCookieResponse(user, res, 201);
});

//desc      Login user
//Route     POST /api/auth/login
//Access    Public
export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new ErrorResponse("Inserisci una mail", 400));
  }
  if (!password) {
    next(new ErrorResponse("inserisci una password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse(`Nessun utente associato con la mail: ${email}`, 400)
    );
  }

  const passwordMatch = await user.validatePassword(password);

  if (!passwordMatch) {
    return next(new ErrorResponse("Password errata", 401));
  }

  sendCookieResponse(user, res, 200);
});

//Funzione per rispondere con il Token/inserirlo nel Cookie
const sendCookieResponse = (user, res, statusCode) => {
  const token = user.getSignedToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 3600 * 1000
      ),
    })
    .json({
      success: true,
      token,
    });
};

//desc      User ottiene le sue info personali
//Route     GET /api/auth/me
//Access    Private
export const getMe = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      sucess: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ErrorResponse("c'è stato un problema nel recuperare i tuoi dati", 500)
    );
  }
});
