const express = require('express');
const app = express();
const path = require('path');
const productRouter = require('./app/product/routes');
const productRouterV2 = require('./app/product_v2/routes');
const logger  = require('morgan');



app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1',productRouter);
app.use('/api/v2',productRouterV2);
app.use('/', (req, res, next) => {
    res.status(404);
    res.send ( {
        status: 'failed',
        message: 'Resources: ' + req.originalUrl + '  failed'
    });
});

app.listen(3000, ()=> console.log('server : http://localhost:3000'))
// const host = '0.0.0.0';
// const port = process.env.PORT || 80;

// app.listen(port, host, function() 
//     {console.log('server starting.....');
// });

