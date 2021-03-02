import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";
import sendMail from "../utils/sendMail.js";

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
      isAdmin: user.isAdmin,
    });
};

//desc      Creazione di un nuovo user
//Route     POST /api/auth/register
//Access    Public
export const createNewUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const responseToken = user.createRegisterToken();
  const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${responseToken}`;

  try {
    await sendMail({
      to: req.body.email,
      subject: "Conferma Registrazione",
      text: `conferma l'iscrizione a proShop. Link di Conferma: \n\n  ${resetUrl}`,
    });
    sendCookieResponse(user, res, 201);
  } catch (error) {
    console.log(error);
    await User.findByIdAndRemove(user._id);
    next(new ErrorResponse("impossibile inviare mail", 500));
  }
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

  if (!(await user.validatePassword(password))) {
    return next(new ErrorResponse(`Password errata`, 401));
  }

  sendCookieResponse(user, res, 200);
});

//desc      User ottiene le sue info personali
//Route     GET /api/auth/me
//Access    Private
export const getMe = asyncHandler(async (req, res, next) => {
  console.log(req.cookies);
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

//desc      Modifica info di base user
//Route     PUT /api/auth/updateinfo
//Access    Private
export const updateUserInfo = asyncHandler(async (req, res, next) => {
  let fieldToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  //Elimino i campi vuoti per far aggiornare solo quello desiderato dall'user
  for (const [key, value] of Object.entries(fieldToUpdate)) {
    if (!value) {
      delete fieldToUpdate[key];
    }
  }

  if (!fieldToUpdate) {
    return next(new ErrorResponse("Inserisci almento un campo da modificare"));
  }
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { ...fieldToUpdate } },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

//desc      Modifica password utente loggato
//Route     PUT /api/auth/updatepassword
//Access    Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  const passwordMatch = await user.validatePassword(currentPassword);

  if (!passwordMatch) {
    return next(new ErrorResponse("Password sbagliata, riprova", 400));
  }

  user.password = newPassword;
  await user.save();

  sendCookieResponse(user, res, 200);
});

//desc      User ottiene le sue info personali
//Route     GET /api/auth/logout
//Access    Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    })
    .json({ success: true, data: {} });
});
