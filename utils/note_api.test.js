const palindrome = string => {
  return string
    .split('')
    .reverse()
    .join('');
};

test('func', () => {
  const word = 'is th?';
  expect(palindrome(word)).toBe('?ht si')
});
