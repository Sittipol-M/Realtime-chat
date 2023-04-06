const handleErrors = (error, req, res, next) => {
  const { message, status, detail, errorType, errors } = error;
  if (error) {
    console.error(error);
    res.status(status || 500).send({ success: false, message, httpCode: status, errorType, errors });
  }
  next();
};

export default handleErrors;
