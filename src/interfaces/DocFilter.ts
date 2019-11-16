import { MongooseDocument } from "mongoose";

export default interface IDocFilter {
    apply(doc: MongooseDocument): object
}