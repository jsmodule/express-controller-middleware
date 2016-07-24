exports.isValid = function(obj) {
  return obj !== undefined && obj !== null;
};

exports.isValidString = function(string) {
  return this.isValid(string) && string.length > 0;
};
