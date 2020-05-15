const express = require('express');
const router = express.Router();

module.exports = router;

/* User API */
router.use('/user', require('./User'));

/* Coin API */
router.use('/coin', require('./Coin'));