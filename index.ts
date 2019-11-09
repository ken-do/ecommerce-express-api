import express = require('express');
import path = require('path');
import serveStatic = require('serve-static');

import ProductController from './src/controllers/ProductController';
import RouteHelper from './src/ultils/RouteHelper';
import CheckoutController from './src/controllers/CheckoutController';
import passport from './passport';

require('dotenv').config()

const app = express();

app.use(serveStatic(path.join(__dirname, 'src', 'static')));
app.use(express.json());

const routeHelper = new RouteHelper(app);
routeHelper.createCRUDRoutes('/api/products', new ProductController);

app.post('/api/checkout',
    passport.authenticate('basic', { session: false }),
    CheckoutController.checkout
);

app.listen(process.env.PORT, function () {
    console.log('Server started on PORT ' + process.env.PORT);
});