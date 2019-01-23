// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../../modules/logger';
import {IConfiguration} from '../../configuration';

// route imports
import {SystemInfoRouter} from './system-info-router';
import {DriveRouter} from './drive-router';
import {RouterBase} from '../router-base';
// TODO: this is autogen'd


let logger: ILogger = createLogger('api index v1');


export function initializeRoutes(app: Application, configuration: IConfiguration): void {
    logger.info('Initializing API v1 routes');

    // TODO: this is autogen'd
    initializeRoute(app, new SystemInfoRouter(configuration));
    initializeRoute(app, new DriveRouter(configuration));
}

function initializeRoute(app: Application, router: RouterBase) {
    router.initialize();
    app.use('/api/v1/:toyPrefix/', router.router);
}
