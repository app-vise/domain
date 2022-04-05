import { Color } from '../../src';

test('hex', () => {
  expect(new Color({ red: 0, green: 0, blue: 0 }).hex).toBe('#000000');
  expect(new Color({ red: 255, green: 255, blue: 255 }).hex).toBe('#ffffff');
  expect(new Color({ red: 0, green: 211, blue: 219 }).hex).toBe('#00d3db');
});
