import { Request } from 'express';
import IUserData from './UserData';

export default interface IAuthenticatedRequest extends Request {
    user: IUserData
}