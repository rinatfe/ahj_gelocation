function validationInput(str) {
  const regexp = /^\[?-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}\,\s{0,1}\-?([0-8]?[0-9]|[1-9]0)\.{1}\d{1,6}\]?/g; // eslint-disable-line
  return str.match(regexp);
}

export { validationInput }; // eslint-disable-line