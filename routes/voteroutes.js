const express = require('express');
const { castVote } = require('../controller/votecontroller');
const router = express.Router();

router.post('/cast', castVote);

module.exports = router;
