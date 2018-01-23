const express = require('express');
const controller = require('../controllers/sneakers');

const router = express.Router();

router.get('/sneakers', controller.get);
router.get('/sneakers/:id', controller.getById);
router.get('/brands', controller.getAllBrands);
router.get('/sizes', controller.getAllSizes);

module.exports = router;
