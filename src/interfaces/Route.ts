import ICRUDController from "./CRUDController";

export default interface IRoutes {
    path: string,
    controller: ICRUDController | any,
    requestMethod?: string,
    handler?: string,
    useCRUD?: boolean,
}