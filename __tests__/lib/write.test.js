'use strict';

const write = require('../../lib/write.js');

jest.mock('fs');

describe('`write` function', () => {
  const text = 'Yabba dabba doo!';
  const file = 'file.txt';
  it('resolves when given a good file', () => {
    return expect(write(file, text)).resolves.toBeUndefined();
  });
  it('rejects when given a bad file', () => {
    const badFile = 'bad.txt';
    return expect(write(badFile, text)).rejects.toEqual('Invalid File');
  });
  it('rejects when given bad data', () => {
    const badData = 'bad';
    return expect(write(file, badData)).rejects.toBe('Invalid Buffer');
  });
});
