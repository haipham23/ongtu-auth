const OK = {
  status: 200,
  message: 'OK'
};

const INVALID_PROPS = {
  status: 400,
  message: 'INVALID_PROPS'
};

const EXISTING_ACCOUNT = {
  status: 400,
  message: 'EXISTING_ACCOUNT'
};

const ACCOUNT_NOT_FOUND = {
  status: 404,
  message: 'ACCOUNT_NOT_FOUND'
};

const SERVER_ERROR = {
  status: 500,
  message: 'SERVER_ERROR'
};


module.exports = {
  OK,
  INVALID_PROPS,
  EXISTING_ACCOUNT,
  ACCOUNT_NOT_FOUND,
  SERVER_ERROR
};
