const express = require('express');
const controller = require('../controllers/sneakers');

const router = express.Router();

router.get('/', controller.get);

module.exports = router;