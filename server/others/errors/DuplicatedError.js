class DuplicatedError extends Error {
  constructor({ message, detail }) {
    super(message);
    this.detail = this.detail;
    this.status = 409;
    this.errorType = "duplication";
  }
}

export default DuplicatedError;
