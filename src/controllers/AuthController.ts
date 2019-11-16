import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import User from '../models/User';
import DocFilter from '../ultils/DocFilter';
import IDocFilter from '../interfaces/DocFilter';
import Token from '../ultils/Token';
import IAuthenticatedRequest from '../interfaces/AuthenticatedRequest';

export default class AuthController {
    public userFilter: IDocFilter;
    public userModel: any;

    constructor() {
        this.userModel = new User;
        this.userFilter = new DocFilter(this.userModel);

    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.userModel.findOne({ email });
            const passwordIsValid = await bcrypt.compare(password, user.hashedPassword);

            if (passwordIsValid) {
                const token = Token.encrypt(email + password);

                user.token = token;
                user.tokenExpiryTime = this.addDays(new Date, 15).getTime();

                await user.save();
                res.send(this.userFilter.apply(user));

            } else {
                throw ('Unauthorized');
            }

        } catch (e) {
            res.status(401);
            res.send({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
    }

    async logout(req: IAuthenticatedRequest, res: Response) {
        const user = await this.userModel.findOne({ email: req.user.email });;
        user.token = undefined;
        user.tokenExpiryTime = undefined;
        await user.save();

        res.send('Logged out');
    }

    private addDays(date: Date, days: number) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
