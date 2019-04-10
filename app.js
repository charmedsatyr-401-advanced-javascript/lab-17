'use strict';

const net = require('net');
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const client = new net.Socket();
client.connect(PORT, HOST, handleConnect);
client.on('close', handleClose);

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const uppercase = buffer => Buffer.from(buffer.toString().toUpperCase());

const alterFile = file => {
  readFile(file)
    .then(uppercase)
    .then(buffer => writeFile(file, buffer))
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
 * This function logs a message to the console
 * when the TCP connection is closed.
 * @function
 * @name handleClose
 **/
function handleClose() {
  console.log(`app: Connection closed...`);
}
