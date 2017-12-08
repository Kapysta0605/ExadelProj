const dao = require('../dao/sneakers');

function get(query) {
  return new Promise((res, rej) => {
    dao.get(query)
      .then(result => res(result))
      .catch(err => rej(err));
  });
}

module.exports = {
  get,
};
