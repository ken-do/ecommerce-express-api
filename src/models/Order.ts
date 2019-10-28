import OrderSchema from '../schemas/Order';
import IOrderData from '../interfaces/OrderData';
import Model from './Model';
import { model } from 'mongoose';

export default class Order extends Model<IOrderData>{

    constructor() {
        super();
        this.model = model('Order', OrderSchema);
    }
}