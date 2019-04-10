'use strict';

const { handleData, handleConnect, handleClose } = require('../logger.js');

const log = jest.spyOn(global.console, 'log');

describe('`handleData` function', () => {
  it('should do nothing if its argument has the wrong format', () => {
    const input = 'lazy';
    const result = handleData(input);
    expect(result).toBeUndefined();
    expect(log).not.toHaveBeenCalled();
    log.mockClear();
  });
  it('should log event, payload, and message values if they exist for a `save` event', () => {
    const obj = { event: 'save', payload: 'file.txt', message: 'yippee!' };
    const input = Buffer.from(JSON.stringify(obj));
    handleData(input);
    expect(log).toHaveBeenCalledWith(`Saved: file.txt, yippee!`);
    log.mockClear();
  });
  it('should log event, payload, and message values if they exist for an `error` event', () => {
    const obj = { event: 'error', payload: 'file.txt', message: 'noooo!' };
    const input = Buffer.from(JSON.stringify(obj));
    handleData(input);
    expect(log).toHaveBeenCalledWith(`Error: file.txt, noooo!`);
    log.mockClear();
  });
});

describe('`handleConnect` function', () => {
  it('should log to the console once', () => {
    handleConnect();
    expect(log).toHaveBeenCalledTimes(1);
    log.mockClear();
  });
});

describe('`handleClose` function', () => {
  it('should log to the console once', () => {
    handleClose();
    expect(log).toHaveBeenCalledTimes(1);
    log.mockClear();
  });
});
