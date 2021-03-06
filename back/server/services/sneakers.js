const dao = require('../dao/sneakers');

async function get(query) {
  let result = await dao.get(query);
  if (!result[0].length) return;
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
  return list;
}

async function getById(id) {
  let result = await dao.getById(id);
  result = result[0];
  if (!result.length) return;
  const sneaker = result[0];
  const sizes = {};
  result.forEach((item) => {
    sneaker.price = Math.min(sneaker.price, item.price);
    if (!sizes[item.size]) {
      sizes[item.size] = [];
    }
    sizes[item.size].push({
      name: item.store,
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
  const imgs = await dao.getSneakersImgs(id);
  sneaker.imgs = imgs[0].map(img => img.url);
  return sneaker;
}

async function getFilterMeta() {
  const result = {};
  [result.brands, result.sizes] = await Promise.all([dao.getAllBrands(), dao.getAllSizes()]);
  result.sizes = result.sizes[0].length
                ? result.sizes[0].map(size => size.size).sort((a, b) => a - b)
                : undefined;
  result.brands = result.brands[0].length
                ? result.brands[0].map(brand => brand.name)
                : undefined;
  return result;
}

module.exports = {
  get,
  getById,
  getFilterMeta,
};
