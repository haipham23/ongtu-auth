import jwt from 'jsonwebtoken';
import getenv from 'getenv';

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

export default {
  generate
};
