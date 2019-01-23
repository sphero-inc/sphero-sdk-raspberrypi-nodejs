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
    private readonly _configuration: IConfiguration;

    protected get _apiDal(): IApiDal {
        return this._configuration.apiDal;
    }

    protected readonly _logger: ILogger;

    public get name(): string {
        return this._name;
    }

    public get router(): Router {
        return this._router;
    }

    protected constructor(name: string, configuration: IConfiguration) {
        this._name = name;
        this._router = Router({mergeParams: true});
        this._configuration = configuration;

        this._logger = createLogger(name);
    }

    public initialize(): void {
        this._logger.info('Initializing routes...');

        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;

    protected logRouteDebug(operation: string, message: string): void {
        this._logger.debug('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteInfo(operation: string, message: string): void {
        this._logger.info('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteWarning(operation: string, message: string): void {
        this._logger.warning('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteError(operation: string, message: string): void {
        this._logger.error('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteException(operation: string, message: string, error: Error): void {
        this._logger.exception(error, 'Operation: ' + operation + ' | Message: ' + message);
    }
}
