import { MongooseDocument } from 'mongoose';

export default interface IModel<T> {
    create: (product: T) => Promise<MongooseDocument>,
    read: (id : string) => Promise<MongooseDocument>,
    update: (id : string, data: Partial<T>) => Promise<MongooseDocument>,
    remove: (id: string) => Promise<string>,
    index: () => Promise<T[]>,
    excludedFields: string[]
}