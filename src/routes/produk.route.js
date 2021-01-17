const { route } = require('../middlewaves/app-middlewares');
const express = require('express');
const router = express.Router();
const ProductService = require('../service/produk.service');
const ProductController = require('../controller/produk.controller');
const tokenValidation = require('../middlewaves/token.validation');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req,file, cb){
        console.log('file route',file);
        
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter =  (req, file, cb) => {
    if (file.mimetype === 'image.jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);        
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, limits: {fileSize: 1024 * 1024 * 5},fileFilter: fileFilter});

const productService = new ProductService();

// router.use(tokenValidation);
router.get('/', (req, res, next) => ProductController.getProductList(req, res, productService));
router.get('/image/:id', (req, res, next) => ProductController.getImage(req, res, productService));
router.post('/', (req, res, next) => ProductController.createProduct(req, res, productService));
router.post('/upload', upload.single('productImage'), (req, res, next) => ProductController.uploadImage(req, res, productService))
router.delete('/', (req, res, next) => ProductController.deleteProduct(req, res, productService));
router.put('/', (req, res, next) => ProductController.updateProduct(req, res, productService));

module.exports = router;