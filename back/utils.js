const convertKeys = require('./utils/convert-keys');
const namesEditor = require('./utils/names-editor.js');
const dateFormatter = require('./utils/date-formatter');
const translit = require('./utils/translit');
const changeFormatter = require('./utils/changes-formatter');

function clearFields(item) {
  Object.keys(item).forEach((field) => {
    if (!item[field] || Array.isArray(item[field]) && item[field].length === 0) {
      delete item[field];
    }
  });
  return item;
}

module.exports = {
  toCamel: convertKeys.toCamel,
  toSnake: convertKeys.toSnake,
  formChange: changeFormatter.formChange,
  dateFormatter,
  namesEditor,
  translit,
  clearFields,
};
