const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const routeV1 = require('./routes/routeV1');

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1', routeV1);

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log('listening on %i', app.get('port'));
});
