// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../../modules/logger';
import {IConfiguration} from '../../configuration';

// route imports
import {SystemInfoRouter} from './system-info-router';
import {DrivingRouter} from './driving-router';
import {RouterBase} from '../router-base';
// TODO: this is autogen'd


let logger: ILogger = createLogger('api index v1');


export function initializeRoutes(app: Application, configuration: IConfiguration): void {
    logger.info('Initializing API v1 routes');

    // TODO: this is autogen'd
    initializeRoute(app, new SystemInfoRouter());
    initializeRoute(app, new DrivingRouter());
}

function initializeRoute(app: Application, router: RouterBase) {
    router.initialize();
    app.use('/api/v1/rv/', router.router);
}
