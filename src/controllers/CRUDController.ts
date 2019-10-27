import * as express from 'express';
import Model from '../models/Model';
import ICRUDController from '../interfaces/CRUDController';
import IModel from '../interfaces/Model';


export default class CRUDController implements ICRUDController {
    
    public model: IModel<any>;

    constructor() {
        this.model = new Model;
    }

    async index(req: express.Request, res: express.Response): Promise<void> {
        const results = await this.model.index();
        res.send(results);
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            const newProduct = await this.model.create(data);
            res.send(newProduct);
        }
    }
    
    async read(req: express.Request, res: express.Response): Promise<void> {
        const model = await this.model.read(req.params.id);
        res.send(model);
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            const updatedProduct = await this.model.update(req.params.id, data);
            res.send(updatedProduct);
        }
    }

    async remove(req: express.Request, res: express.Response): Promise<void> {
        const message = await this.model.remove(req.params.id);
        res.send(message);
    }
}