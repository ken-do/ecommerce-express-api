import * as express from 'express';

export default interface ICRUDController {
    create(req: express.Request, res: express.Response): Promise<void>,
    read(req: express.Request, res: express.Response): Promise<void>,
    update(req: express.Request, res: express.Response): Promise<void>,
    remove(req: express.Request, res: express.Response): Promise<void>,
    index(req: express.Request, res: express.Response): Promise<void>,
}