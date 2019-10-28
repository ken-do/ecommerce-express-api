import UserSchema from '../schemas/User';
import IUserData from '../interfaces/UserData';
import Model from './Model';
import { model } from 'mongoose';

export default class User extends Model<IUserData>{

    constructor() {
        super();
        this.Model = model('User', UserSchema);
    }
}

export const user = new User;