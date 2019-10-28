import ProductSchema from '../schemas/Product';
import IProductData from '../interfaces/ProductData';
import Model from './Model';
import { model } from 'mongoose';

export default class Product extends Model<IProductData>{

    constructor() {
        super();
        this.Model = model('Product', ProductSchema);
    }
}

export const product = new Product;