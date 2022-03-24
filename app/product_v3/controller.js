const { ObjectId } = require('bson');
const db = require('../../config/mongodb');
const path = require ('path');
const fs = require ('fs');


const index = (req, res) => {
  db.collection('products').find()
  .toArray()
  .then(result => res.send(result))
  .catch(error => res.send(error));
}
const view = (req, res) => {
  const {id} = req.params;
  db.collection('products').findOne({_id:ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}
//delete
const destroy = (req, res) => {
  const {id} = req.params;
  db.collection('products').deleteOne({_id:ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}
//insert
const store = (req, res) => {
  const {name,  price, stock, status} = req.body;
  const image = req.file;
  if(image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);

      db.collection('products').insertOne({name,  price, stock, status,image_url :`http://localhost:3000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
  }
}

//update
const update = (req, res) => {
  const {id} = req.params;
  const {name,  price, stock, status} = req.body;
  const image = req.file;
  if(image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);

      db.collection('products').updateOne({_id:ObjectId(id)}, {$set: {name: name, price: price, stock : stock, status: status, image_url: image}}) 
        .then(result => res.send(result))
        .catch(error => res.send(error));
  }
}


module.exports = {
    index,
    view,
    store,
    update,
    destroy
};