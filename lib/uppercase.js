'use strict';

/**
 * @function
 * @name uppercase
 * @param data {buffer} The string or buffer to be transformed to uppercase
 **/
const uppercase = data => Buffer.from(data.toString().toUpperCase());

module.exports = uppercase;
