const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it ('should generate Location message correctly', () => {
    const from = 'Admin';
    const latitude = 1;
    const longitude = 1;

    const message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
  });
});