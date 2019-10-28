import * as express from 'express';

import Order from '../models/Order';
import User from '../models/User';
import IOrderData from '../interfaces/OrderData';

export default class CheckoutController {
    
    static checkout(req: express.Request, res: express.Response) {
        let userId: string, newOrder: IOrderData;
        const { email, phone, address, orderItems } = req.body;
        const user = new User;
        const userModel = user.model;
        const existingUser = userModel.find({email});

        if (existingUser) {
            userId = existingUser._id
        } else {
            userId = userModel.create({email, phone, address})._id;
        }

        const order = new Order;
        newOrder = order.model.create({user_id: userId, order_items: orderItems});

        res.send('Ordered successfully.');
    }
    
}