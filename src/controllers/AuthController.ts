import * as express from 'express';
import * as bcrypt from 'bcrypt';

import IDocFilter from '../interfaces/DocFilter';

import User from '../models/User';
import DocFilter from '../ultils/DocFilter';

export default class AuthController {
    public userFilter: IDocFilter;
    public userModel: any;

    constructor() {
        const userObj = new User;
        this.userModel = userObj.model;
        this.userFilter = new DocFilter(this.userModel);
    }

    login(req: express.Request, res: express.Response) {
        const { email, password } = req.body;
        const user = this.userModel.find({ email });
        const passwordIsValid = bcrypt.compare(password, user.hashedPassword);

        if (passwordIsValid) {
           res.send(this.userFilter.apply(user)); 
        } else {
            res.status(401);
        }
    }
}