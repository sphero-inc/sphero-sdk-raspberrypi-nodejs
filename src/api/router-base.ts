// external imports
import {Router} from 'express';

// internal imports
import {IRouter} from './router-interfaces'
import {defaultLogger as logger} from '../modules/logger';


export abstract class RouterBase implements IRouter {
    private readonly _name: string;
    private readonly _router: Router;

    public get name(): string {
        return this._name;
    }

    public get router(): Router {
        return this._router;
    }

    protected constructor(name: string) {
        this._name = name;
        this._router = Router();
    }

    public initialize(): void {
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;

    protected logRouteDebug(operation: string, message: string): void {
        logger.debug('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteInfo(operation: string, message: string): void {
        logger.info('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteWarning(operation: string, message: string): void {
        logger.warning('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteError(operation: string, message: string): void {
        logger.error('Operation: ' + operation + ' | Message: ' + message);
    }

    protected logRouteException(operation: string, message: string, error: Error): void {
        logger.exception(error, 'Operation: ' + operation + ' | Message: ' + message);
    }
}
