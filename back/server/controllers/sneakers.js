const service = require('../services/sneakers');

function get(req, res) {
  service.get(req.query)
    .then(result => res.status(200).send(result))
    .catch((error) => {
      res.sendStatus(500);
      throw error;
    });
}

function getById(req, res) {
  service.getById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch((error) => {
      res.sendStatus(500);
      throw error;
    });
}


module.exports = {
  get,
  getById,
};
