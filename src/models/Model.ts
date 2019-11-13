import IModel from '../interfaces/Model';
import { connect, MongooseDocument } from 'mongoose';
import { Timestamp } from 'bson';

export default class Model<T> implements IModel<T> {

    public model: any;
    public data: Partial<T>;
    public excludedFields: string[] = [];

    constructor(data?: Partial<T>) {
        connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
        if (data) {
            this.data = data;
        }
    }
    async save() {
        const doc = await this.create(this.data);
        return doc;
    }
    async index() {
        const docs = await this.model.find({});
        return docs;
    }

    async create(data: Partial<T>) {
        const doc = new this.model(data);
        await doc.save();
        return doc;
    }

    async read(id: string) {
        const doc = await this.model.findOne({ _id : id });
        return doc;
    }
    
    async update(id: string, data: Partial<T>) {
        let doc = await this.read(id);
        if (doc && doc.save) {
            for (let key in data) {
                doc[key] = data[key];
            }
            await doc.save();
        } else {
            doc  = await this.create(data);
        }
        return doc;
    }

    async remove(id: string) {
        const doc = this.model.find({ _id : id });
        await doc.deleteOne();
        return `product id ${id} has been removed from the products list`;
    }
}