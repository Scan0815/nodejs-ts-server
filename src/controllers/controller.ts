import express, { NextFunction, Response, Request } from "express";
import {TMethod} from "../interfaces/method.interface";

export abstract class Controller {
    protected readonly app: express.Application;
    protected readonly methodToFunction: { [key: string]: Function } = {
        post: this.create,
        get: this.read,
        put: this.update,
        delete: this.delete
    }

    constructor(route: string, app: express.Application, methods: TMethod[] = ["post", "get", "put", "delete"], middleware?: { [key: string]: any } | undefined) {
        this.app = app;
        methods.map(method => {
            if (middleware?.hasOwnProperty(method)) {
                this.app[method](route, middleware[method], (req, res, next) => this.methodToFunction[method](req, res, next, middleware[method]))
            } else {
                this.app[method](route, (req, res, next) => this.methodToFunction[method](req, res, next, middleware?.[method]))
            }
        });
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log("create");
        try {
            return res.send("create id:" + req.params?.id);
        } catch (e) {
            next(e);
        }
    }

    async read(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log("read");
            return res.send("read id:" + req.params?.id);
        } catch (e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log("update");
            return res.send("update id:" + req.params?.id);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log("delete");
            return res.send("delete id:" + req.params?.id);
        } catch (e) {
            next(e);
        }
    }

}