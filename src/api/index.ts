// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../modules/logger';
import {IConfiguration} from '../configuration';

// route imports
import * as v1dot0Router from './v1.0';
import {IApiDal} from '../modules/api-dal-interface';


let logger: ILogger = createLogger('api index');


export function initializeRoutes(app: Application, apiDal: IApiDal, configuration: IConfiguration): void {
    logger.debug('Initializing API routes');
    v1dot0Router.initializeRoutes(app, apiDal, configuration);
}

export function initializeCommandMappings(app: Application, apiDal: IApiDal, configuration: IConfiguration) {
    logger.debug("Initializing command mappings");
    v1dot0Router.registerCommandParserFactory(app, apiDal, configuration);
}
