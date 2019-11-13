import { MongooseDocument } from 'mongoose';
import IModel from '../interfaces/Model';
import IDocFilter from '../interfaces/DocFilter';

export default class DocFilter implements IDocFilter {
    public model: IModel<any>;

    constructor(model: IModel<any>) {
        this.model = model;
    }

    public apply(doc: MongooseDocument) {
        let filteredDoc: Partial<MongooseDocument> = doc;
        filteredDoc = this.removeExcludedFields(doc);
        //additonal filters can be added here
        return filteredDoc;
    }

    public removeExcludedFields(doc: MongooseDocument) {
        if (this.model.excludedFields.length) {
            let filteredDoc: Partial<MongooseDocument>;
            for (let key in doc) {
                if (doc.hasOwnProperty(key) && this.model.excludedFields.indexOf(key) === -1) {
                    filteredDoc[key] = doc[key];
                }
            }
            return filteredDoc;
        }
        
        return doc;
    }
}