import ErrorResponse from "../utils/ErrorResponse.js";
const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.name, err.code);

  console.log(err);
  if (err.name === "CastError") {
    const message =
      "Id per la Risorsa non valido. Fornisci un ID formattato correttamente";
    error = new ErrorResponse(message, 400);
  }
  if (err.code === 11000) {
    const message = `l'email ${req.body.email} è gia associata ad un altro utente. Riprova`;
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((errorMsg) => {
        console.log(errorMsg);
        return `${errorMsg.properties.message}`;
      })
      .join()
      .trimStart();
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    data: null,
    error: error.message || "server Error",
  });
};

export default errorHandler;
