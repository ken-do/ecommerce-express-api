import * as express from 'express';

import Order from '../models/Order';
import User from '../models/User';

export default class CheckoutController {
    
    async checkout(req: express.Request, res: express.Response) {
        let userId: string;
        const { email, phone, address, items } = req.body;
        const user = new User;
        const userModel = user.model;
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            userId = existingUser._id
        } else {
            const newUser = await userModel.create({email, phone, address});
            userId = newUser._id;
        }
        
        const order = new Order({user_id: userId, order_timestamp: new Date().getTime(), order_items: items});
        await order.save();
        res.send({ message: 'Ordered successfully.'});
    }
    
}