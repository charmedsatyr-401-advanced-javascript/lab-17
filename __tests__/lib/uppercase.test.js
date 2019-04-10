'use strict';

const uppercase = require('../../lib/uppercase.js');

describe('`uppercase` function', () => {
  it('should transform its argument text to uppercase', () => {
    const text = 'test';
    const buffIn = Buffer.from(text);
    const buffOut = uppercase(buffIn);
    const result = 'TEST';
    expect(buffOut.toString()).toBe(result);
  });
  it('should accept and return a buffer', () => {
    const text = 'test';
    const buffIn = Buffer.from(text);
    const result = 'TEST';
    const buffOut = Buffer.from(result);
    expect(uppercase(buffIn)).toEqual(buffOut);
  });
});
