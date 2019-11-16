import * as express from 'express';
import * as bcrypt from 'bcrypt';

import User from '../models/User';
import DocFilter from '../ultils/DocFilter';
import IDocFilter from '../interfaces/DocFilter';

export default class AuthController {
    public userFilter: IDocFilter;
    public userModel: any;

    constructor() {
        this.userModel = new User;
        this.userFilter = new DocFilter(this.userModel);
    }

    async login(req: express.Request, res: express.Response) {
        const { email, password } = req.body;
        try {
            const user = await this.userModel.findOne({ email });
            const passwordIsValid = await bcrypt.compare(password, user.hashedPassword);
            if (passwordIsValid) {
                res.send(this.userFilter.apply(user)); 
            } else {
                throw('Unauthorized');
            }
        } catch(e) {
            res.status(401);
            res.send({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
    }
}