
const router = require ('express').Router();
const Product = require('./model');
const multer = require('multer');
const upload = multer({dest : 'uploads'});
const path = require('path');
const fs = require('fs');


router.get('/', async(req, res ) => {
    await Product.findAll()
   .then(product => res.send(product));
});

router.get('/product/:id', async(req, res ) => {
    await Product.findAll({
        where : {
            id: req.params.id
        }
    })
    .then(product => res.json(product));
});

router.delete('/product/:id', async(req, res ) => {
    await Product.destroy({
        where : {
            id: req.params.id
        }
    })
    .then(product => res.json(product));
});

router.post ('/product',upload.single('image'), async(req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image =  req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target) ;
        try {  
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `https://expresseduwork.herokuapp.com/${image.originalname}`});
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }

});

router.put('/product/:id',upload.single('image'), async(req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image =  req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target) ;
        try {  
            await Product.sync();
                const result = await Product.update({users_id, name, price, stock, status, image_url: `https://expresseduwork.herokuapp.com/${image.originalname}`},
                {where : { id: req.params.id} }

            );
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }

});


module.exports = router;

