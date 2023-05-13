class StatusCodeError extends Error {
  constructor(statusCode, msg) {
   super(msg)
   this.statusCode = statusCode
  }
}

module.exports = StatusCodeError