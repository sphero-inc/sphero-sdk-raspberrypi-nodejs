// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../modules/logger';
import {IConfiguration} from '../configuration';

// route imports
import * as v1Router from './v1';


let logger: ILogger = createLogger('api index');


export function initializeRoutes(app: Application, configuration: IConfiguration): void {
    logger.info('Initializing API routes');
    v1Router.initializeRoutes(app, configuration);
}
