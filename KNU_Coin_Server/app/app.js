const express = require('express');
const app = express();

app.use('/test', require('./api/test'));

module.exports = app;
