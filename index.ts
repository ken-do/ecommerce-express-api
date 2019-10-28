import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';
import ProductController from './src/controllers/ProductController';
import RouteHelper from './src/ultils/RouteHelper';
import CheckoutController from './src/controllers/CheckoutController';

require('dotenv').config()

const app = express();

app.use(serveStatic(path.join(__dirname, 'src', 'static')));
app.use(express.json());


const routeHelper = new RouteHelper(app);
routeHelper.createCRUDRoutes('/api/products', new ProductController);

app.post('/api/checkout', CheckoutController.checkout);


app.listen(process.env.PORT,  function() {
    console.log('Server started on PORT ' + process.env.PORT);
});