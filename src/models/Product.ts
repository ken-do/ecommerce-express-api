import IProductData from '../interfaces/ProductData';

import ProductSchema from '../schemas/Product';
import Model from './Model';
import { model } from 'mongoose';

export default class Product extends Model<IProductData>{

    constructor(data?: Partial<IProductData>) {
        super();
        this.model = model('Product', ProductSchema);
    }
}