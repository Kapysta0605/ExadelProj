const Sequelize = require('sequelize');

const sequelize = new Sequelize('snkr_srch', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: '8000',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

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
    RIGHT JOIN sneakers.sizes on sneakers_to_stores.id = sizes.sneakers_to_stores_id`);
}

function getById(id) {
  return sequelize.query(`SELECT brands.name as brand, stores.name as store, sneakers.model, sneakers.id, currency, price, sizes.size, sneakers_to_stores.url
    FROM sneakers.sneakers_to_stores
    LEFT JOIN sneakers.sneakers on sneaker_id = sneakers.id
    LEFT JOIN sneakers.stores on store_id = stores.id
    LEFT JOIN sneakers.brands on brand_id = brands.id
    LEFT JOIN sneakers.sizes on sneakers_to_stores.id = sizes.sneakers_to_stores_id  
    WHERE sneakers.id = '${id}'`);
}

function getSneakersImgs(id){
  return sequelize.query(`SELECT url
  FROM sneakers.sneaker_imgs
  WHERE sneaker_id = '${id}'`);
}

module.exports = {
  getSneakersImgs,
  get,
  getById,
};
