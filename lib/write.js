const fs = require('fs');

const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

/**
 * @function
 * @name write
 * @param file {path} The path to a file on the filesystem
 * @param data {buffer} The data to write to the file
 **/
const write = (file, text) => writeFile(file, Buffer.from(text));

module.exports = write;
