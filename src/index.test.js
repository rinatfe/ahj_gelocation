import { validationInput } from './js/validate';

test('positive validate', () => {
  expect(validationInput('55.22, 44.22')).toEqual(['55.22, 44.22']);
});

test('positive validate', () => {
  expect(validationInput('55.22,44.22')).toEqual(['55.22,44.22']);
});

test('positive validate', () => {
  expect(validationInput('[55.22, 44.22]')).toEqual(['[55.22, 44.22]']);
});

test('negative card validate', () => {
  expect(validationInput('[55.22,  44.22]')).toBe(null);
});
