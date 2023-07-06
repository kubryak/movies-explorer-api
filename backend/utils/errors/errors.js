const BadRequestError = require('./BadRequestError');
const ConflictingRequestError = require('./ConflictingRequestError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  BadRequestError,
  ConflictingRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
};
