const forOwn = require('lodash.forown');
const snakeCase = require('lodash.snakecase');
const camelCase = require('lodash.camelcase');
const isPlainObject = require('lodash.isplainobject');
const isArray = require('lodash.isarray');

/**
 * @description walk tree
 * @param {Object | Array} obj
 * @param {Function} cb - callback
 * @returns {Object | Array}
 */
function walk(obj, cb) {
  const x = isArray(obj) ? [] : {};

  forOwn(obj, (v, k) => {
    if (isPlainObject(v) || isArray(v) || typeof (v) === typeof ({})
      && v != null && !(v instanceof Date)) {
      v = walk(v, cb);
    }

    x[cb(k)] = v;
  });

  return x;
}

const toCamel = (obj) => {
  const newObj = walk(obj, k => camelCase(k));
  return newObj;
};

const toSnake = (obj) => {
  const newObj = walk(obj, (k) => {
    return snakeCase(k);
  });

  return newObj;
};

module.exports = {
  toCamel,
  toSnake,
};
