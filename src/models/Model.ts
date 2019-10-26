import IModel from '../interfaces/Model';
import { readFile, writeFile, readFileSync } from 'fs';
import { connect } from 'mongoose';

interface IDWise {
    id: string
}

export default abstract class Model<T extends IDWise> implements IModel<T> {

    public Model: any;

    constructor() {
        connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    
    async index() {
        const docs = await this.Model.find({});
        return docs;
    }

    create(data: Partial<T>) {
        const doc = new this.Model(data);
        doc.save();
        return doc;
    }

    read(id: string) {
        return this.Model.find({ _id : id });
    }
    
    async update(id: string, data: Partial<T>) {
        let doc = new this.Model(data);
        if (doc) {
            for (let entry in data) {
                if (data.hasOwnProperty(entry)) {
                    doc[entry] = data[entry];
                }
            }
            await doc.save();
        } else {
            doc  = this.create(data);
        }
        return doc;
    }

    remove(id: string) {
        this.Model.find({ _id : id }).remove();
        return `product id ${id} has been removed from the products list`;
    }

}
