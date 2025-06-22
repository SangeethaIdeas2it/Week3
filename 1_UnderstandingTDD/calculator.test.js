const add = require('./calculator');

describe('add', () => {
  test('should return 5 when adding 2 and 3', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should correctly add negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('should correctly add decimal numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('should throw an error if the first argument is not a number', () => {
    expect(() => add('2', 3)).toThrow('Both arguments must be numbers.');
  });

  test('should throw an error if the second argument is not a number', () => {
    expect(() => add(2, '3')).toThrow('Both arguments must be numbers.');
  });

  test('should throw an error if both arguments are not numbers', () => {
    expect(() => add('2', '3')).toThrow('Both arguments must be numbers.');
  });
}); 