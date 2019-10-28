import IModel from '../interfaces/Model';
import { connect } from 'mongoose';

export default class Model<T> implements IModel<T> {

    public Model: any;

    constructor() {
        connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    
    async index() {
        const docs = await this.Model.find({});
        return docs;
    }

    async create(data: Partial<T>) {
        const doc = new this.Model(data);
        await doc.save();
        return doc;
    }

    async read(id: string) {
        const doc = await this.Model.findOne({ _id : id });
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
        const doc = this.Model.find({ _id : id });
        await doc.deleteOne();
        return `product id ${id} has been removed from the products list`;
    }

}
