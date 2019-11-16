import * as express from 'express';
import * as bcrypt from 'bcrypt';

import User from '../models/User';
import IUserData from '../interfaces/UserData';
import IModel from '../interfaces/Model';
import CRUDController from './CRUDController';
import DocFilter from '../ultils/DocFilter';
import IDocFilter from '../interfaces/DocFilter';

export default class UserController extends CRUDController {
    
    public model: IModel<IUserData>;

    constructor() {
        super();
        this.model = new User;
        this.filter = new DocFilter(this.model);
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body;
        if (data) {
            const { password, ...userInfo } = data;
            const hashedPassword = await bcrypt.hash(password, 10);
            let newDoc = await this.model.create({ ...userInfo, hashedPassword });
            res.send(this.filter.apply(newDoc));
        }
    }
}