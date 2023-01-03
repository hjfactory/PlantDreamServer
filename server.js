const express = require('express');

const app = express();
app.set('port', process.env.PORT || 8080);

// app.get('/', function(req, res) {
//     res.send('Hello world!!');
// })
app.get('/', (req, res) => {
    res.send('Hello world!!');
});


app.listen(app.get('port'), () => {
    console.log('listening on ' + app.get('port'));
});
