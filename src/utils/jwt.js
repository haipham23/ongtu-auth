const jwt = require('jsonwebtoken');
const getenv = require('getenv');

/**
 * generate jwt
 *
 * @param {string} username username
 *
 * @return {string} jwt
 */
function generate(username) {
  return jwt.sign(
    { user: username },
    getenv('JWT_SECRET'),
    { expiresIn: '7 days' }
  );
}

module.exports = {
  generate
};
