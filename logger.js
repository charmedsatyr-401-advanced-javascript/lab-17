'use strict';

const net = require('net');

const client = new net.Socket();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

client.connect(PORT, HOST, handleConnect);
client.on('data', handleData);
client.on('close', handleClose);

/**
 * This function logs a message to the console
 * when the TCP connection is established.
 * @function
 * @name handleConnect
 **/
function handleConnect() {
  console.log(`logger: Connection established...`);
}

/**
 * This function parses received data and logs
 * `save` and `error` events to the console.
 * @function
 * @name handleData
 * @param buffer {buffer} A TCP buffer
 **/
function handleData(buffer) {
  const received = JSON.parse(buffer.toString().trim());
  const { event, payload, message } = received;
  const m = message ? `, Message: ${message}` : '';
  if (event === 'save') {
    console.log(`Saved: ${payload}${m}`);
  } else if (event === 'error') {
    console.error(`Error: ${payload}${m}`);
  }
}

/**
 * This function logs a message to the console
 * when the TCP connection is closed.
 * @function
 * @name handleClose
 **/
function handleClose() {
  console.log(`logger: Connection closed...`);
}
