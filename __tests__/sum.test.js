// __tests__/sum.test.js
function sum(a, b) { return a + b; }
test('sum 1 + 2 is 3', () => {
  expect(sum(1,2)).toBe(3);
});
