const HttpStatusCodes = require("../config/http.status.config");

class SuccessResponse {
  constructor(
    message,
    statusCode = HttpStatusCodes.OK.code,
    reasonStatusCode = HttpStatusCodes.OK.reason,
    metadata = {}
  ) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor(message, metadata) {
    super(message, metadata );
  }
}

class Created extends SuccessResponse {
  constructor(
    message,
    statusCode = HttpStatusCodes.CREATED.code,
    reasonStatusCode = HttpStatusCodes.CREATED.reason,
    metadata
  ) {
    super(
      message,
      (statusCode = HttpStatusCodes.CREATED.code),
      (reasonStatusCode = HttpStatusCodes.CREATED.reason),
      metadata
    );
  }
}

module.exports = {
  Ok,
  Created,
};
