'use strict';

const net = require('net');
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const client = new net.Socket();

const read = require('./lib/read.js');
const uppercase = require('./lib/uppercase.js');
const write = require('./lib/write.js');

// Connect to the TCP socket
client.connect(PORT, HOST, handleConnect);

// Connection error handling
client.on('error', handleError);

/**
 * This function reads a file and replaces its contents with
 * uppercased letters. It sends an object to a connected TCP socket
 * on completion or error and disconnects from the socket.
 * @function
 * @name alterFile
 * @param file {path} The path to a file on the filesystem
 */
const alterFile = file => {
  read(file)
    .then(uppercase)
    .then(buffer => write(file, buffer))
    .then(() => {
      const save = JSON.stringify({ event: 'save', payload: file });
      client.write(save);
      client.end(handleClose);
    })
    .catch(err => {
      const error = JSON.stringify({ event: 'error', payload: file, message: err.message });
      client.write(error);
      client.end(handleClose);
    });
};

const file = process.argv.slice(2).shift();
alterFile(file);

// Fallback close handler
client.on('close', handleClose);

/**
 * This function logs a message to the console
 * when the TCP connection is established.
 * @function
 * @name handleConnect
 **/
function handleConnect() {
  console.log(`app: Connection established...`);
}

/**
 * This function logs client connection errors.
 * @function
 * @name handleError
 * @param err {object} An error
 **/
function handleError(err) {
  console.error(`app error: ${err.message}`);
}

/**
 * This function logs a message to the console
 * when the TCP connection is closed.
 * @function
 * @name handleClose
 **/
function handleClose() {
  console.log(`app: Connection closed...`);
}

// Export
module.exports = { alterFile, handleConnect, handleError, handleClose };
