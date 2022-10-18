let express = require('express');
let router = express.Router();
router.get('/', (req, res) => {
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            res.render('index');
        })
        .catch(err => next(err));
});

module.exports = router;