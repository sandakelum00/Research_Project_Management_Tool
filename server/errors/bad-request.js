const CustomAPIError = require("./custom-api.js");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuseCode = 400;
  }
}

module.exports = BadRequestError;
