import ErrorResponse from "../utils/ErrorResponse.js";

const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.name, err.code);

  if (err.name === "CastError") {
    const message =
      "Id per la Risorsa non valido. Fornisci un ID formattato correttamente";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    data: null,
    error: error.message || "server Error",
  });
};

export default errorHandler;
