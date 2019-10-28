import express from 'express';

import { order } from '../models/Order';
import { user } from '../models/User';
import IOrderData from '../interfaces/OrderData';

export default class CheckoutController {
    
    static checkout(req: express.Request, res: express.Response) {
        let userId: string, newOrder: IOrderData;
        const { email, phone, address, orderItems } = req.body;
        const userModel = user.Model;
        const existingUser = userModel.find({email});

        if (existingUser) {
            userId = existingUser._id
        } else {
            userId = userModel.create({email, phone, address})._id;
        }

        newOrder = order.Model.create({user_id: userId, order_items: orderItems});

        res.send('Ordered successfully.');
    }
    
}