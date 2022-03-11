const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const log  = require('./middlewdare/logger');


app.use(log);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(router);
app.use('/', (req, res, next) => {
    res.status(404);
    res.send ( {
        status: 'failed',
        message: 'Resources: ' + req.originalUrl + '  failed'
    });
});

app.listen(3001, () => console.log('server: http://localhost:3001'))