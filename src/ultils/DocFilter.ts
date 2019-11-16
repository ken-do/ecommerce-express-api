import { MongooseDocument } from 'mongoose';
import IModel from '../interfaces/Model';
import IDocFilter from '../interfaces/DocFilter';

export default class DocFilter implements IDocFilter {
    public model: IModel<any>;

    constructor(model: IModel<any>) {
        this.model = model;
    }

    public apply(doc: MongooseDocument) {
        let filteredDoc: MongooseDocument;
        filteredDoc = this.removeExcludedFields(doc);
        //additonal filters can be added here
        return filteredDoc;
    }

    private removeExcludedFields(doc: MongooseDocument) {
        if (this.model.excludedFields.length > 0) {
            for (let key in doc) {
                if (this.model.excludedFields.indexOf(key) > -1) {
                    doc[key] = undefined;
                }
            }
        }
        return doc;
    }
}