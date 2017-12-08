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

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

function get(filter) {
  return sequelize.query(`SELECT brands.name, sneakers.model, sneakers.id, currency, price, sneakers.color, size FROM sneakers.sneakers_to_stores
    LEFT JOIN sneakers.sneakers on sneaker_id = sneakers.id
    LEFT JOIN sneakers.brands on brand_id = brands.id`);
}

module.exports = {
  get,
};
