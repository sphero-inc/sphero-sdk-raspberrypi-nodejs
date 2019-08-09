// external imports
import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {Server as HttpServer} from 'http';
import * as WebSocket from 'ws';

const swaggerUi = require('swagger-ui-express');
import swaggerDocument = require('../api/v1.0/swagger.json');

// internal imports
import apiRouter = require('../api/');
import {IConfiguration} from '../configuration';
import {createLogger, ILogger} from './logger';
import dateTimeUtilities = require('../utilities/date-time-utilities');
import {IApiDal} from './api-dal-interface';


let logger: ILogger = createLogger('app');


export class App {
    private _isInitialized: boolean = false;
    private _server: HttpServer;
    private _apiDal: IApiDal;
    private _configuration: IConfiguration;

    readonly expressApp: express.Application;

    constructor() {
        this.expressApp = express();
    }

    public initialize(server: HttpServer, apiDal: IApiDal, configuration: IConfiguration): void {
        if (this._isInitialized) {
            logger.warning('App has already been initialized!');
            return;
        }

        // TODO: validate args

        this._server = server;
        this._apiDal = apiDal;
        this._configuration = configuration;

        this.expressApp.locals.title = this._configuration.applicationTitle;

        this.initializeMiddleware();
        this.initializeRoutes();
        this.finalizeInitialization();

        this._isInitialized = true;

        const wss = new WebSocket.Server({ server: this._server, path: '/stream', clientTracking: true});

        wss.on('connection', (ws: WebSocket) => {
            ws.send("Hello from server");

            ws.on('message', (message: string) => {
                ws.send(`Hello client, you sent -> ${message}`);
            });


        });

        this._apiDal.socketSend = (message: string) => {
            wss.clients.forEach(client => {
                client.send(`Hello, broadcast message -> ${message}`);
            });
        };



    }

    private initializeMiddleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: true}));
        this.expressApp.use(compression());
        this.expressApp.use(cors());
        // this.expressApp.use(express.static(path.join(path.dirname(__dirname), 'public')));

        // more options --> https://github.com/scottie1984/swagger-ui-express
        this.expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // explore using this
        // https://github.com/expressjs/errorhandler

        this.expressApp.use(function (request: express.Request, response: express.Response, next: express.NextFunction) {
            let message = 'Request Received'
                + ' | Timestamp: ' + dateTimeUtilities.getDateAsString(new Date())
                + ' | IP: ' + request.ip
                + ' | URL: ' + request.url
                + ' | Path: ' + request.path
                + ' | Method: ' + request.method
                + ' | Protocol: ' + request.protocol
                + ' | IsSecure: ' + request.secure;

            // TODO: add query and params
            // TODO: can the response be logged here or where can that happen?

            logger.info(message);

            next();
        });

        this.expressApp.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
            /*
            var err = new Error('Something went wrong');
            next(err);
            */

            logger.exception(error, 'An error occurred while handling a request.');

            this.routeErrorHandler(response, 'Unknown error occurred...', 'An unknown error has occurred!');
        });

        // TODO: add views / view engine
    }

    private initializeRoutes(): void {
        this.expressApp.get('/', function (request, response) {
            response.sendFile('index.html');
        });

        this.expressApp.get('/dashboard', function (req, res){
            res.sendFile( '/home/pi/raspberry-pi-node-js/dashboard/dashboard.html');
        });

        apiRouter.initializeRoutes(this.expressApp, this._apiDal, this._configuration);
    }

    private finalizeInitialization(): void {
        this.expressApp.all('*', function (request: express.Request, response: express.Response) {
            logger.error('Unknown route!');

            response.sendStatus(404);
        });
    }

    private routeErrorHandler(response: express.Response, reason: string, message: string, code?: number, error?: Error) {
        if (error) {
            logger.exception(error, reason);
        } else {
            logger.error(reason);
        }

        response.status(code || 500).json({'error': message});
    }
}
