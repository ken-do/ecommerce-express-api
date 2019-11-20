import IOrderData from '../interfaces/OrderData';

import OrderSchema from '../schemas/Order';
import Model from './Model';
import { model } from 'mongoose';

export default class Order extends Model<IOrderData>{

    constructor(data?: Partial<IOrderData>) {
        super(data);
        this.model = model('Order', OrderSchema);
    }
}