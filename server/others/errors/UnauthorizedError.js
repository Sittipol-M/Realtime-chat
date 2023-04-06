class UnauthorizedError extends Error {
  constructor({ message, detail }) {
    super(message);
    this.detail = detail;
    this.status = 401;
    this.errorType = "unauthorized";
  }
}

export default UnauthorizedError;
