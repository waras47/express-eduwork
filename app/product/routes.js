const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest : 'uploads'});
// const fs = require('fs');
// const path = require('path');
const controllerProduct = require('./controller');




router.get('/product', controllerProduct.index) ;
router.get('/product/:id',controllerProduct.view);
router.post('/product/', upload.single('image'), controllerProduct.store);
router.put('/product/:id', upload.single('image'),controllerProduct.update);
router.delete('/product/delete/:id', upload.single('image'),controllerProduct.destroy);

// router.get('/:category/:tag', (req, res) => {
//     const{category, tag} =req.params;
//     res.json({category, tag});
// } );

// app.post('/cover', upload.single('image'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   })

module.exports = router;