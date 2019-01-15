// external imports
import {Application} from 'express';

// internal imports
import {defaultLogger as logger} from '../modules/logger';
import {IConfiguration} from '../configuration';

// route imports
import * as v1Router from './v1';


export function initializeRoutes(app: Application, configuration: IConfiguration): void {
    logger.info('Initializing API routes');
    v1Router.initializeRoutes(app, configuration);
}
