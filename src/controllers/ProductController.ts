import { product } from '../models/Product';
import IProductData from '../interfaces/ProductData';
import IModel from '../interfaces/Model';
import CRUDController from './CRUDController';

export default class ProductController extends CRUDController {
    
    public model: IModel<IProductData>;

    constructor() {
        super();
        this.model = product;
    }

}