export interface IEnv {
    api: string;
    port: number;
    cors: {
        origin: string;
        AllowedOrigins: any[];
        optionsSuccessStatus: number;
        methods: string[]
    },
    debug: boolean;
}