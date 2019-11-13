import * as express from 'express';

import Model from '../models/Model';
import ICRUDController from '../interfaces/CRUDController';
import IModel from '../interfaces/Model';
import IDocFilter from '../interfaces/DocFilter';
import DocFilter from '../ultils/DocFilter';

export default class CRUDController implements ICRUDController {
    
    public model: IModel<any>;
    public excludedFields: string[];
    public filter: IDocFilter;

    constructor() {
        this.model = new Model;
        this.filter = new DocFilter(this.model);
    }

    async index(req: express.Request, res: express.Response): Promise<void> {
        let docs = await this.model.index();
        docs = docs.map(doc => this.filter.apply(doc));
        res.send(docs);
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            let newDoc = await this.model.create(data);
            newDoc = this.filter.apply(newDoc);
            res.send(newDoc);
        }
    }
    
    async read(req: express.Request, res: express.Response): Promise<void> {
        let doc = await this.model.read(req.params.id);
        doc = this.filter.apply(doc);
        res.send(doc);
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            let updatedDoc = await this.model.update(req.params.id, data);
            updatedDoc = this.filter.apply(updatedDoc);
            res.send(updatedDoc);
        }
    }

    async remove(req: express.Request, res: express.Response): Promise<void> {
        const message = await this.model.remove(req.params.id);
        res.send(message);
    }
}