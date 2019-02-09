// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../../modules/logger';
import {IConfiguration} from '../../configuration';
import {DeviceRouterBase} from '../device-router-base';
import {IApiDal} from '../../modules/api-dal-interface';

// route imports
import {ApiAndShellDeviceRouter} from './0x10-api-and-shell-device-router'
import {IoDeviceRouter} from './0x1A-io-device-router'
import {FactoryTestDeviceRouter} from './0x1F-factory-test-device-router'
import {DriveDeviceRouter} from './0x16-drive-device-router'
import {FirmwareDeviceRouter} from './0x1D-firmware-device-router'
import {SensorDeviceRouter} from './0x18-sensor-device-router'
import {SystemModeDeviceRouter} from './0x12-system-mode-device-router'
import {PowerDeviceRouter} from './0x13-power-device-router'
import {ConnectionDeviceRouter} from './0x19-connection-device-router'
import {SystemInfoDeviceRouter} from './0x11-system-info-device-router'


let logger: ILogger = createLogger('api index v1.0');


export function initializeRoutes(app: Application, apiDal: IApiDal, configuration: IConfiguration): void {
	logger.debug('Initializing API v1.0 routes');
	
	initializeRoute(app, new ApiAndShellDeviceRouter(apiDal, configuration));
	initializeRoute(app, new IoDeviceRouter(apiDal, configuration));
	initializeRoute(app, new FactoryTestDeviceRouter(apiDal, configuration));
	initializeRoute(app, new DriveDeviceRouter(apiDal, configuration));
	initializeRoute(app, new FirmwareDeviceRouter(apiDal, configuration));
	initializeRoute(app, new SensorDeviceRouter(apiDal, configuration));
	initializeRoute(app, new SystemModeDeviceRouter(apiDal, configuration));
	initializeRoute(app, new PowerDeviceRouter(apiDal, configuration));
	initializeRoute(app, new ConnectionDeviceRouter(apiDal, configuration));
	initializeRoute(app, new SystemInfoDeviceRouter(apiDal, configuration));
}

function initializeRoute(app: Application, deviceRouter: DeviceRouterBase) {
	deviceRouter.initialize();
	app.use('/api/v1.0/', deviceRouter.router);
}
