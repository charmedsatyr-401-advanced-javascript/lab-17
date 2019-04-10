'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if (file.match(/bad/i)) {
    cb('Invalid File');
  } else {
    cb(undefined, new Buffer.from('File Contents'));
  }
};

exports.writeFile = (file, buffer, cb) => {
  if (!file || file.match(/bad/i)) {
    cb('Invalid File');
  } else if (!Buffer.isBuffer(buffer) || buffer.includes('bad')) {
    cb('Invalid Buffer', undefined);
  } else {
    cb(undefined, undefined);
  }
};
