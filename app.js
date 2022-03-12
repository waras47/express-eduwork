const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const log  = require('./middlewdare/logger');


app.use(log);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);
app.use('/', (req, res, next) => {
    res.status(404);
    res.send ( {
        status: 'failed',
        message: 'Resources: ' + req.originalUrl + '  failed'
    });
});
const host = '0.0.0.0';
const port = process.env.PORT || 80;

app.listen(port, host, function() 
    {console.log('server starting.....');
});

