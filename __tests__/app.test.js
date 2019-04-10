'use strict';

const { alterFile, handleConnect, handleClose } = require('../app.js');

const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});

describe('`alterFile` function', () => {
  it('should not throw an error', () => {
    const file = 'file.txt';
    expect(() => alterFile(file)).not.toThrow();
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
