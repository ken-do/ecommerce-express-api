import * as express from 'express';
import { MongooseDocument } from 'mongoose';


import Model from '../models/Model';
import ICRUDController from '../interfaces/CRUDController';
import IModel from '../interfaces/Model';

export default class CRUDController implements ICRUDController {
    
    public model: IModel<any>;
    public excludedFields: string[];

    constructor() {
        this.model = new Model;
        this.excludedFields = [];
    }

    async index(req: express.Request, res: express.Response): Promise<void> {
        let docs = await this.model.index();
        docs = docs.map(doc => this.applyFilter(doc));
        res.send(docs);
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            let newDoc = await this.model.create(data);
            newDoc = this.applyFilter(newDoc);
            res.send(newDoc);
        }
    }
    
    async read(req: express.Request, res: express.Response): Promise<void> {
        let doc = await this.model.read(req.params.id);
        doc = this.applyFilter(doc);
        res.send(doc);
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            let updatedDoc = await this.model.update(req.params.id, data);
            updatedDoc = this.applyFilter(updatedDoc);
            res.send(updatedDoc);
        }
    }

    async remove(req: express.Request, res: express.Response): Promise<void> {
        const message = await this.model.remove(req.params.id);
        res.send(message);
    }

    private applyFilter(doc: MongooseDocument) {
        let filteredDoc: Partial<MongooseDocument> = doc;
        filteredDoc = this.removeExcludedFields(doc);
        //additonal filters can be added here
        return filteredDoc;
    }

    private removeExcludedFields(doc: MongooseDocument) {
        if (this.excludedFields.length) {
            let filteredDoc: Partial<MongooseDocument>;
            for (let key in doc) {
                if (doc.hasOwnProperty(key) && this.excludedFields.indexOf(key) === -1) {
                    filteredDoc[key] = doc[key];
                }
            }
            return filteredDoc;
        }
        
        return doc;
    }
}