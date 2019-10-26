import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';
import ProductController from './src/controllers/ProductController';

require('dotenv').config()

const app = express();

app.use(serveStatic(path.join(__dirname, 'src', 'static')));
app.use(express.json());

app.get('/api/products', ProductController.index);

app.listen(process.env.PORT,  function() {
    console.log('Server started on PORT ' + process.env.PORT);
});