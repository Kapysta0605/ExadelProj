const Sequelize = require('sequelize');
const Elasticsearch = require('elasticsearch');

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

// const client = new Elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace',
// });

// client.ping({
//   requestTimeout: 30000,
// }, (error) => {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

function formString(key, items) {
  if (items.length === 1) {
    return `${key} = ${items[0]}`;
  }
  const string = [];
  string.push(`${key} IN (`);
  items.forEach((item) => {
    string.push(item);
    string.push(',');
  });
  string[string.lastIndexOf(',')] = ')';
  return string.join('');
}

function formQuery(filter) {
  const query = [];
  if (filter) {
    Object.keys(filter).forEach((key, i) => {
      switch (key) {
        case 'departament':
          query.push(`sneakers.gender = ${filter[key][0]}`);
          break;
        case 'price':
          query.push(`${key} >= ${filter[key][0]}`);
          query.push(`${key} <= ${filter[key][1]}`);
          break;
        case 'brand':
          query.push(formString('brands.name', filter[key]));
          break;
        default:
          query.push(formString(key, filter[key]));
          break;
      }
    });
    query[0] = `WHERE ${query[0]}`;
    return query.join(' AND ');
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
