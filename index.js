let express = require('express');
let app = express();

//set public static folder: set index file
app.use(express.static(__dirname + '/public'))

//use view engine: express-handlebars
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//define your routes here
app.get('/', (req, res) => {
    res.render('index')
});
app.get('/:page', (req, res) => {
    let banners = {
        blog: {
            banner1: 'Our Blog',
            banner2: 'Blog'
        },
        category: {
            banner1: 'Shop Category',
            banner2: 'Shop Category'
        },
        cart: {
            banner1: 'Shopping Cart',
            banner2: 'Shopping Cart'
        },
        checkout: {
            banner1: 'Product Checkout',
            banner2: 'Checkout'
        },
        confirmation: {
            banner1: 'Order Confirmation',
            banner2: 'Shop Category'
        },
        contact: {
            banner1: 'Contact Us',
            banner2: 'Contact Us'
        },
        login: {
            banner1: 'Login / Register',
            banner2: 'Login/Register'
        },
        register: {
            banner1: 'Register',
            banner2: 'Register'
        },
        'single-blog': {
            banner1: 'Blog Details',
            banner2: 'Blog Details'
        },
        'single-product': {
            banner1: 'Shop Single',
            banner2: 'Shop Single'
        },
        'tracking-order': {
            banner1: 'Order Tracking',
            banner2: 'Order Tracking'
        }
    };
    let page = req.params.page;
    res.render(page, { banner1: banners[page].banner1, banner2: banners[page].banner2 });
});


//set sever port and start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});