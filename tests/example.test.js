function sum(a, b) {
  return a + b;
}

test('menjumlahkan 1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});
