import express,{Response,Request} from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';
import { MorganMiddleware } from "../service/morgan.middleware";
import { UsersController } from '../controllers/users.controller';
import {IEnv} from "../interfaces/env.interface";
const env: IEnv = require('../../.env.json');

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (env.cors.origin.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: env.cors.methods,
    optionsSuccessStatus: env.cors.optionsSuccessStatus
};

export class ExpressServer {
    private readonly _app: express.Application;
    private readonly server: Server;
    private readonly port: string | number;
    private bodyParser = require('body-parser');

    constructor(port: number) {
        this.port = port;
        this._app = express();
        //this._app.use(authMiddleware)
        this._app.use(this.bodyParser.json({ limit: '50mb' }));
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(cors(corsOptions));
        this._app.use(MorganMiddleware);
        this._app.enable("trust proxy");
        this.server = createServer(this._app);
        void this.database().then(() => {
            this.listen();
            this.routes();
        });
    }



    private database = async (): Promise<void> => {
        try {
            console.log("connected");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        } finally {
            process.on('SIGINT', async () => {
                process.exit(1);
            });
        }
    }


    private listen(): void {
        try {
            this.server.listen(this.port, () => {
                console.log('Server running on PORT', `${this.port}`);
            });
        } catch (error) {
            console.error("Error connecting to Server:", error);

        }
    }


    private routes(): void {
        this._app.get('/', (_req: Request, res: Response) => {
            res.status(200).send('Hello World!')
        });
        new UsersController(env.api + "/user", this._app, ["get"]);
    }

    get app(): express.Application {
        return this._app;
    }



}
