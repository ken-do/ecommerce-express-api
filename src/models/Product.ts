import ProductSchema from '../schemas/Product';
import IProductData from '../interfaces/ProductData';
import Model from './Model';
import { model } from 'mongoose';

export default class Product extends Model<IProductData>{

    constructor(data?: Partial<IProductData>) {
        super();
        this.model = model('Product', ProductSchema);
        this.excludedFields = ['__v'];
    }
}