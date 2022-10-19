let express = require('express');
let app = express();

//set public static folder: set index file
app.use(express.static(__dirname + '/public'))

//use view engine: express-handlebars
let expressHbs = require('express-handlebars');
let helper = require('./controllers/helper');
let paginateHelper = require('express-handlebars-paginate');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        createStarList: helper.createStarList,
        createStars: helper.createStars,
        createPagination: paginateHelper.createPagination
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//body parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use cookie parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//use session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}));

//use cart controller
let Cart = require('./controllers/cartController');
app.use((req, res, next) => {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;
    res.locals.totalQuantity = cart.totalQuantity;
    next();
})
//define your routes here
// / => index
// /products => category
// /products/:id => single + product
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));
app.use('/cart', require('./routes/cartRouter'));
app.get('/sync', (req, res) => {
    let models = require('./models');
    models.sequelize.sync()
        .then(() => { res.send('database sync complete!') });
});
// app.get('/:page', (req, res) => {
//     let banners = {
//         blog: {
//             banner1: 'Our Blog',
//             banner2: 'Blog'
//         },
//         products: {
//             banner1: 'Shop Category',
//             banner2: 'Shop Category'
//         },
//         cart: {
//             banner1: 'Shopping Cart',
//             banner2: 'Shopping Cart'
//         },
//         checkout: {
//             banner1: 'Product Checkout',
//             banner2: 'Checkout'
//         },
//         confirmation: {
//             banner1: 'Order Confirmation',
//             banner2: 'Shop Category'
//         },
//         contact: {
//             banner1: 'Contact Us',
//             banner2: 'Contact Us'
//         },
//         login: {
//             banner1: 'Login / Register',
//             banner2: 'Login/Register'
//         },
//         register: {
//             banner1: 'Register',
//             banner2: 'Register'
//         },
//         'single-blog': {
//             banner1: 'Blog Details',
//             banner2: 'Blog Details'
//         },
//         'single-product': {
//             banner1: 'Shop Single',
//             banner2: 'Shop Single'
//         },
//         'tracking-order': {
//             banner1: 'Order Tracking',
//             banner2: 'Order Tracking'
//         }
//     };
//     let page = req.params.page;
//     console.log("\n" + page + "\n");
//     console.log("\n" + page + "\n");
//     console.log("\n" + page + "\n");
//     console.log("\n" + page + "\n");
//     console.log("\n" + page + "\n");

//     Object.keys(banners).forEach(key => {
//         if (key == page) {
//             res.render(page, { banner1: banners[page].banner1, banner2: banners[page].banner2 });
//         }
//     });

// });

//set sever port and start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});