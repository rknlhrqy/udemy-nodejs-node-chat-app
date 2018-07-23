const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it ('should generate message correctly', () => {
    const from = 'Admin';
    const text = 'Hello, how are you doing?';

    const message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeLessThan(new Date().getTime());
    const oneHourAgo = new Date((new Date()).valueOf() - 1000*60*60);
    expect(message.createdAt).toBeGreaterThan(oneHourAgo.getTime());
  });
});