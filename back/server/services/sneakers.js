const dao = require('../dao/sneakers');

function get(query) {
  return new Promise((res, rej) => {
    dao.get(query)
      .then((result) => {
        const list = [];
        result = result[0].sort((a, b) => a.id.localeCompare(b.id));
        let sneaker = result[0];
        const hash = new Set();
        result.forEach((item) => {
          if (item.id === sneaker.id) {
            sneaker.price = Math.min(sneaker.price, item.price);
          } else {
            sneaker.sizes = [...hash];
            sneaker.sizes.sort((a, b) => parseFloat(a) - parseFloat(b));
            delete sneaker.size;
            list.push(sneaker);
            hash.clear();
            sneaker = item;
          }
          hash.add(item.size);
        });
        sneaker.sizes = [...hash];
        sneaker.sizes.sort((a, b) => parseFloat(a) - parseFloat(b));
        delete sneaker.size;
        list.push(sneaker);
        return res(list);
      })
      .catch(err => rej(err));
  });
}

function getById(id) {
  return new Promise((res, rej) => {
    dao.getById(id)
      .then((result) => {
        result = result[0];
        const sneaker = result[0];
        const sizes = {};
        result.forEach((item) => {
          sneaker.price = Math.min(sneaker.price, item.price);
          if (!sizes[item.size]) {
            sizes[item.size] = [];
          }
          sizes[item.size].push({
            shop: item.store,
            price: item.price,
            currency: item.currency,
            url: item.url,
          });
        });
        sneaker.sizes = [];
        Object.keys(sizes).forEach((key) => {
          sneaker.sizes.push({
            value: key,
            shops: sizes[key],
          });
        });
        sneaker.sizes.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
        delete sneaker.url;
        return res(sneaker);
      })
      .catch(err => rej(err));
  });
}

module.exports = {
  get,
  getById,
};
