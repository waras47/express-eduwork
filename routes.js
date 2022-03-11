const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res)=> {
        res.send({
            status: 'succsessfully',
            message : 'welcome to mern eduwork express & wahyudin',
            
        });    
    });
    router.get('/about', (req, res)=> {
      
        res.json ({about, nama});
    });

    router.get('/about/:nama', (req, res)=> {
        res.send('<h2>nama :</h2>' + req.params.nama);    
    });

    router.post('/image', upload.single('image'),(req, res)=> {
        const {name, price, stock,status} = req.body;
        const image = req.file;

        if (image) {
            const target = path.join(__dirname, 'uploads', image.originalname);
            fs.renameSync(image.path, target)
            // res.json({
            //     name,
            //     price,
            //     stock,
            //     status,
            //     image
            // });

             res.sendFile(target); 
        }
           
    });


    
    router.get('/:about/:nama', (req, res)=> {
        const {about, nama} = req.params;
        res.json ({about, nama});
    });
 module.exports = router;