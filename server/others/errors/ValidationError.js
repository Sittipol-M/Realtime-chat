class ValidationError extends Error {
  constructor({ message, detail, errors}) {
    super(message);
    this.detail = detail;
    this.status = 400;
    this.errorType = "validation",
    this.errors = errors
  }
}

export default ValidationError;
