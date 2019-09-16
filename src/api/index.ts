// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../modules/logger';
import {IConfiguration} from '../configuration';

// route imports
import * as v1dot0Router from './v1.0';
import {GenericCommandRouter} from './generic-command-router';
import {LedControlRouter} from './control-routers/led-control-router';
import {IApiDal} from '../modules/api-dal-interface';
import {DriveControlRouter} from "./control-routers/drive-control-router";
import {InfraredControlRouter} from "./control-routers/infrared-control-router";

let logger: ILogger = createLogger('api index');


export function initializeRoutes(app: Application, apiDal: IApiDal, configuration: IConfiguration): void {
    logger.debug('Initializing API routes');

    v1dot0Router.initializeRoutes(app, apiDal, configuration);

    let genericCommandRouter = new GenericCommandRouter(apiDal, configuration);
    genericCommandRouter.initialize();
    app.use('/api/', genericCommandRouter.router);

    let ledControlRouter = new LedControlRouter(apiDal, configuration);
    ledControlRouter.initialize();
    app.use('/api/', ledControlRouter.router);

    let driveControlRouter = new DriveControlRouter(apiDal, configuration);
    driveControlRouter.initialize();
    app.use('/api/', driveControlRouter.router);

    let infraredControlRouter = new InfraredControlRouter(apiDal, configuration);
    infraredControlRouter.initialize();
    app.use('/api/', infraredControlRouter.router);
}

export function initializeCommandMappings(app: Application, apiDal: IApiDal, configuration: IConfiguration) {
    logger.debug('Initializing command mappings');
    v1dot0Router.registerCommandParserFactory(app, apiDal, configuration);
}
