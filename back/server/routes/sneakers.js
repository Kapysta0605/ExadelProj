const express = require('express');
const controller = require('../controllers/sneakers');

const router = express.Router();

router.get('/sneakers', controller.get);
router.get('/sneakers/:id', controller.getById);
router.get('/filterMeta', controller.getFilterMeta);
router.get('/search/:', controller.getFilterMeta);

module.exports = router;
