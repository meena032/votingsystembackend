const express = require('express');
const { getStats, getResults } = require('../controller/admincontroller');
const router = express.Router();

router.get('/stats', getStats);
router.get('/results', getResults);

module.exports = router;
