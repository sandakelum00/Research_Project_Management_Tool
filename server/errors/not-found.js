const CustomAPIError = require("./custom-api.js");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuseCode = 404;
  }
}

module.exports = NotFoundError;
