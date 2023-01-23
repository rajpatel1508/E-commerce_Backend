const express = require("express");
const router = express.Router();
const { requiresignin, adminMiddleware } = require("../common-middleware");
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require("../controllers/product");
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

//Function to create storage for files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
})
//Assigning storage
const upload = multer({ storage: storage });

//API to create new product
router.post('/product/create', requiresignin, adminMiddleware, upload.array("productPictures"), createProduct);
//API to get Products
router.get('/products/:slug', getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);
router.delete("/product/deleteProductById", requiresignin, adminMiddleware, deleteProductById);
router.post("/product/getProducts", requiresignin, adminMiddleware, getProducts);
module.exports = router;