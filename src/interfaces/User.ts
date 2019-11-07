import IModel from './Model';
import IUserData from './UserData';

export default interface IUser extends IModel<IUserData> {
    validPassword(password: string): boolean
}