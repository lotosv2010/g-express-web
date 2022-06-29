const crypto = require('crypto');

const salt = 'g-express-api';

module.exports = (str) => {
  return crypto.createHash('md5').update(salt).update(str).digest('hex');
}