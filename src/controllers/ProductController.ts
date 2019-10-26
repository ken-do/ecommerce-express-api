import * as express from 'express';
import Product from '../models/Product';

export default class ProductController {
    static async index(req: express.Request, res: express.Response): Promise<void> {
        const product = new Product;
        const results = await product.index();
        res.send(results);
    }

    static create(req: express.Request, res: express.Response): void {
        const data = req.body;
        if (data) {
            const product = new Product(data);
            res.send(product.create(data));
        }
    }
    
    static read(req: express.Request, res: express.Response): void {
        res.send('');
    }

    static update(req: express.Request, res: express.Response): void {
        res.send('');
    }

    static remove(req: express.Request, res: express.Response): void {
        res.send('');
    }
}