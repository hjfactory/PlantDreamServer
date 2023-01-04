const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send({msg: "success"});
});

app.listen(app.get('port'), () => {
    console.log('listening on %i', app.get('port'));
});
