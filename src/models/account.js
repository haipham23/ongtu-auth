import _ from 'lodash';
import Ajv from 'ajv';
import bcrypt from 'bcryptjs';
import schema from './account.json';
import logger from '../utils/logger';

const ajv = new Ajv();
const validate = ajv.compile(schema);

const Account = class Account {
  constructor(o) {
    if (o) {
      this.username = _.trim(o.username);
      this.email = _.trim(o.email);
      this.password = _.trim(o.password);
      this.isActive = true;
    }
  }

  isValid() {
    const valid = validate(this);

    if (!valid) {
      logger.debug('-- account model: --', validate.errors);
    }

    return valid;
  }

  hash(password) {
    return bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10)
    );
  }

  compare(hash) {
    return bcrypt.compare(this.password, hash);
  }

  create() {
    return {
      username: this.username,
      password: this.hash(this.password),
      email: this.email
    };
  }
};

export default Account;
