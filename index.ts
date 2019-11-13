import express = require('express');
import path = require('path');
import serveStatic = require('serve-static');

import ProductController from './src/controllers/ProductController';
import RouteFactory from './src/ultils/RouteFactory';
import CheckoutController from './src/controllers/CheckoutController';
import AuthController from './src/controllers/AuthController';

require('dotenv').config()

const app = express();

app.use(serveStatic(path.join(__dirname, 'src', 'static')));
app.use(express.json());

const routeFactory = new RouteFactory(app);

routeFactory.makePublic([
    {
        path: '/products',
        controller: new ProductController,
        useCRUD: true,
    },
    {
        path: '/checkout',
        requestMethod: 'post',
        controller: new CheckoutController,
        handler: 'checkout'
    },
    {
        path: '/login',
        requestMethod: 'post',
        controller: new AuthController,
        handler: 'login'
    }
]);

routeFactory.makePrivate([
    {
        path: '/user/checkout',
        requestMethod: 'post',
        controller: new CheckoutController,
        handler: 'checkout',
        authenticate: 'basic',
        authenticateOptions: {
            session: false
        }
    }
]);


app.listen(process.env.PORT, function () {
    console.log('Server started on PORT ' + process.env.PORT);
});