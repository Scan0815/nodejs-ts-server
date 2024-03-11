import { Controller } from "./controller";
import {NextFunction,Response,Request} from "express";

export class UsersController extends Controller {

    async read(req: Request, res:Response, next: NextFunction): Promise<any> {
        return super.read(req, res, next);
    }
}