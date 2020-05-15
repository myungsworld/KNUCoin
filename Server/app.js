const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.set('port', process.env.PORT || PORT);

/* API URI */
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log('Express server listening on port '+PORT);
});
