const service = require('../services/sneakers');

async function get(req, res) {
  try {
    const result = await service.get(req.query) || [];
    res.status(200).send(result);
  } catch (error) {
    res.sendStatus(500);
    throw error;
  }
}

async function getById(req, res) {
  try {
    const result = await service.getById(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.sendStatus(500);
    throw error;
  }
}

async function getFilterMeta(req, res) {
  try {
    const result = await service.getFilterMeta();
    res.status(200).send(result);
  } catch (error) {
    res.sendStatus(500);
    throw error;
  }
}


module.exports = {
  get,
  getById,
  getFilterMeta,
};
