import {IEnv} from './interfaces/env.interface';
import { ExpressServer } from './server/express.server';
import { Application } from "express";
const env: IEnv = require('../.env.json');

let app: Application;
app = new ExpressServer(env.port).app;
export { app };