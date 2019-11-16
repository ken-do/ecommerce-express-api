import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';

import ProductController from './src/controllers/ProductController';
import RouteFactory from './src/ultils/RouteFactory';
import CheckoutController from './src/controllers/CheckoutController';
import AuthController from './src/controllers/AuthController';
import UserController from './src/controllers/UserController';

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
        path: '/users',
        controller: new UserController,
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
        authenticate: 'bearer',
        authenticateOptions: {
            session: false
        }
    },
    {
        path: '/logout',
        requestMethod: 'post',
        controller: new AuthController,
        handler: 'logout',
        authenticate: 'bearer',
        authenticateOptions: {
            session: false
        }
    },
]);


app.listen(process.env.PORT, function () {
    console.log('Server started on PORT ' + process.env.PORT);
});