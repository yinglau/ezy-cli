/**
 * These are some helpers!
 */

module.exports = {
  properCase: (str) => {
    if (str.length == 0) {
      return false;
    }
    const _firstStr = str[0];
    const _leftOver = str.substr(1, str.length);
    return _firstStr.toLocaleUpperCase() + _leftOver;
  }
};
