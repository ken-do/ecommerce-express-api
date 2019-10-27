import IModel from '../interfaces/Model';
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

    async create(data: Partial<T>) {
        const doc = new this.Model(data);
        await doc.save();
        return doc;
    }

    async read(id: string) {
        const doc = await this.Model.find({ _id : id });
        return doc;
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

    async remove(id: string) {
        const doc = this.Model.find({ _id : id });
        await doc.remove();
        return `product id ${id} has been removed from the products list`;
    }

}
