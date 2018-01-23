const Sequelize = require('sequelize');

const sequelize = new Sequelize('snkr_srch', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: '1488',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  operatorsAliases: false,
});

function formQuery(filter) {
  const query = [];
  let sent = 'WHERE ';
  let j = 0;
  if (filter) {
    Object.keys(filter).forEach((key, i) => {
      if (i === 1) {
        sent = ' AND ';
      }
      if (key === 'departament') {
        query[i] = `${sent}sneakers.gender = ${filter[key][0]}`;
        return;
      }
      if (key === 'price') {
        query[i] = `${sent}${key} >= ${filter[key][0]} AND ${sent}${key} <= ${filter[key][1]}`;
        return;
      }
      query[i + j] = key === 'brand'
                    ? `${sent}brands.name IN (`
                    : `${sent}${key} IN (`;
      filter[key].forEach((val, l, arr) => {
        j += 1;
        if (l !== arr.length - 1) {
          query[i + j] = `'${val}',`;
          return;
        }
        query[i + j] = `'${val}'`;
      });
      j += 1;
      query[i + j] = ')';
    });
    return query.join('');
  }
}

function get(filter) {
  return sequelize.query(`SELECT sneaker_imgs.url as img, brands.name as brand, sneakers.model, sneakers.id, currency, price, sizes.size
    FROM sneakers.sneakers_to_stores
    LEFT JOIN sneakers.sneakers on sneaker_id = sneakers.id
    LEFT JOIN sneakers.brands on brand_id = brands.id
    LEFT JOIN sneakers.sneaker_imgs on sneaker_imgs.sneaker_id = (
      SELECT sneaker_imgs.sneaker_id 
      FROM sneakers.sneaker_imgs
      WHERE sneaker_imgs.sneaker_id = sneakers.id
      LIMIT 1
    )
    RIGHT JOIN sneakers.sizes on sneakers_to_stores.id = sizes.sneakers_to_stores_id
    ${formQuery(filter)}`);
}

function getById(id) {
  return sequelize.query({
    query: `SELECT brands.name as brand, stores.name as store, sneakers.model, sneakers.id, currency, price, sizes.size, sneakers_to_stores.url
    FROM sneakers.sneakers_to_stores
    LEFT JOIN sneakers.sneakers on sneaker_id = sneakers.id
    LEFT JOIN sneakers.stores on store_id = stores.id
    LEFT JOIN sneakers.brands on brand_id = brands.id
    LEFT JOIN sneakers.sizes on sneakers_to_stores.id = sizes.sneakers_to_stores_id  
    WHERE sneakers.id = ?`,
    values: [id],
  });
}

function getSneakersImgs(id) {
  return sequelize.query(`SELECT url
  FROM sneakers.sneaker_imgs
  WHERE sneaker_id = '${id}'`);
}

function getAllBrands() {
  return sequelize.query(`SELECT brands.name
  FROM sneakers.brands`);
}

function getAllSizes() {
  return sequelize.query(`SELECT sizes.size
  FROM sneakers.sizes
  GROUP BY size`);
}

module.exports = {
  getSneakersImgs,
  get,
  getById,
  getAllBrands,
  getAllSizes,
};
