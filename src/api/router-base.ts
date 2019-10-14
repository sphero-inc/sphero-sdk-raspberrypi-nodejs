// external imports
import {Router} from 'express';

// internal imports
import {IRouter} from './router-interfaces'
import {createLogger, ILogger} from '../modules/logger';
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';


export abstract class RouterBase implements IRouter {
    private readonly _name: string;
    private readonly _router: Router;
    protected readonly _apiDal: IApiDal;
    private readonly _configuration: IConfiguration;

    protected readonly _logger: ILogger;

    public get name(): string {
        return this._name;
    }

    public get router(): Router {
        return this._router;
    }

    protected constructor(name: string, apiDal: IApiDal, configuration: IConfiguration) {
        this._name = name;
        this._router = Router({mergeParams: true});
        this._apiDal = apiDal;
        this._configuration = configuration;

        this._logger = createLogger(name);
    }

    public initialize(): void {
        this._logger.debug('Initializing routes...');

        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;
}
