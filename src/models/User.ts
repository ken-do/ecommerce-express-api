import UserSchema from '../schemas/User';
import IUserData from '../interfaces/UserData';
import Model from './Model';
import { model } from 'mongoose';

export default class User extends Model<IUserData>{

    constructor() {
        super();
        this.model = model('User', UserSchema);
    }
}