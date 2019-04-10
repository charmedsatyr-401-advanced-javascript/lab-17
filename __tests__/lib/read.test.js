'use strict';

const read = require('../../lib/read.js');

jest.mock('fs');

describe('`read` function', () => {
  it('resolves when given a good file', () => {
    const file = 'file.txt';
    const result = read(file);
    return expect(result).resolves.toEqual(Buffer.from('File Contents'));
  });
  it('throws an error when given a bad file', () => {
    const file = 'bad.txt';
    const result = read(file);
    return expect(result).rejects.toEqual('Invalid File');
  });
});
