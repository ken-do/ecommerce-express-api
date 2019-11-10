import IRoute from './Route';

export default interface IPrivateRoute extends IRoute {
    authenticate: string,
    authenticateOptions: object
}