import ProductSchema from '../schemas/Product';
import IProduct from '../interfaces/Product';
import Model from './Model';
import { model } from 'mongoose';

export default class Product extends Model<IProduct>{

    constructor(data?: IProduct) {
        super();
        this.Model = model('Product', ProductSchema);
    }
}