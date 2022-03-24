const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest : 'uploads'});
const Product = require('./model');
const path = require ('path');
const fs = require ('fs');


//read
router.get('/product',(req, res) => {
      Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error))
});
//by id
router.get('/product/:id',(req, res) => {
  const {id} = req.params;
  Product.findById({_id:id})
    .then(result => res.send(result))
    .catch(error => res.send(error));
});
//delete
router.delete('/product/:id',(req, res) => {
  const {id} = req.params;
  Product.findOneAndRemove({_id:id})
    .then(result => res.send(result))
    .catch(error => res.send(error));
});


//create
router.post('/product', upload.single('image'),(req, res) => {
  const {name,  price, stock, status} = req.body;
  const image = req.file;
  if(image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);

      Product.create({name,  price, stock, status,image_url :`http://localhost:3000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
  }
});

//update
router.put('/product/:id', upload.single('image'),(req, res) => {
  const {id} = req.params;
  const {name,  price, stock, status} = req.body;
  const image = req.file;
  if(image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);

      Product.findOneAndUpdate({_id: id},{$set:{name:name, price: price, stock: stock, status:status, image: image}})   
        .then(result => res.send(result))
        .catch(error => res.send(error));
  }
});
// router.put('/product/:id', upload.single('image'),productController.update);
// router.delete('/product/:id', upload.single('image'),productController.destroy);

module.exports = router;