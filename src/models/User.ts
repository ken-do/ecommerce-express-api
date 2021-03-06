import IUserData from '../interfaces/UserData';

import UserSchema from '../schemas/User';
import Model from './Model';
import { model } from 'mongoose';

export default class User extends Model<IUserData>{

    constructor(data?: Partial<IUserData>) {
        super();
        this.model = model('User', UserSchema);
        this.excludedFields = ['hashedPassword', '__v'];
    }
}