let express = require('express');
let router = express.Router();
router.get('/', (req, res) => {
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            let productController = require('../controllers/productController');
            return productController.getTrendingProducts();
        })
        .then(data => {
            res.locals.trendingProducts = data;
            res.render('index');
        })
        .catch(err => next(err));
});

module.exports = router;