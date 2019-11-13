import Product from '../models/Product';
import IProductData from '../interfaces/ProductData';
import IModel from '../interfaces/Model';
import CRUDController from './CRUDController';
import DocFilter from '../ultils/DocFilter';

export default class ProductController extends CRUDController {
    
    public model: IModel<IProductData>;

    constructor() {
        super();
        this.model = new Product;
        this.filter = new DocFilter(this.model);
    }

}