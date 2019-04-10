'use strict';

const { handleData, handleConnect, handleClose } = require('../logger.js');

const log = jest.spyOn(global.console, 'log');
const error = jest.spyOn(global.console, 'error');

describe('`handleData` function', () => {
  it('should do nothing if its argument has the wrong format', () => {
    const input = Buffer.from('lazy');
    const result = handleData(input);
    expect(result).toBeUndefined();
    expect(log).not.toHaveBeenCalled();
    log.mockReset();
  });
  it('should log event, payload, and message values if they exist for a `save` event', () => {
    const obj = { event: 'save', payload: 'file.txt', message: 'yippee!' };
    const input = Buffer.from(JSON.stringify(obj));
    handleData(input);
    expect(log).toHaveBeenCalledWith(`Saved: file.txt, Message: yippee!`);
    log.mockReset();
  });
  it('should log event, payload, and message values if they exist for an `error` event', () => {
    const obj = { event: 'error', payload: 'file.txt', message: 'noooo!' };
    const input = Buffer.from(JSON.stringify(obj));
    handleData(input);
    expect(error).toHaveBeenCalledWith(`Error: file.txt, Message: noooo!`);
    log.mockReset();
  });
});

describe('`handleConnect` function', () => {
  it('should log to the console once', () => {
    handleConnect();
    expect(log).toHaveBeenCalledTimes(1);
    log.mockReset();
  });
});

describe('`handleClose` function', () => {
  it('should log to the console once', () => {
    handleClose();
    expect(log).toHaveBeenCalledTimes(1);
    log.mockReset();
  });
});
