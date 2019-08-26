// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../../modules/logger';
import {IConfiguration} from '../../configuration';
import {DeviceRouterBase} from '../device-router-base';
import {IApiDal} from '../../modules/api-dal-interface';
import {getCommandParserFactory, ICommandParserHandler} from '../../modules/command-parser-factory';

// route imports
import {ApiAndShellDeviceRouter} from './0x10-api-and-shell-device-router'
import {IoDeviceRouter} from './0x1A-io-device-router'
import {DriveDeviceRouter} from './0x16-drive-device-router'
import {SensorDeviceRouter} from './0x18-sensor-device-router'
import {PowerDeviceRouter} from './0x13-power-device-router'
import {ConnectionDeviceRouter} from './0x19-connection-device-router'
import {SystemInfoDeviceRouter} from './0x11-system-info-device-router'

// command parsers
import {parseSensorStreamingDataNotifyResponse} from './command-parsers/0x18-sensor/0x02-sensor-streaming-data-notify-command-parser'
import {parseSendStringToConsoleResponse} from './command-parsers/0x10-api-and-shell/0x03-send-string-to-console-command-parser'

let logger: ILogger = createLogger('api index v1.0');


export function initializeRoutes(app: Application, apiDal: IApiDal, configuration: IConfiguration): void {
	logger.debug('Initializing API v1.0 routes');

	initializeRoute(app, new ApiAndShellDeviceRouter(apiDal, configuration));
	initializeRoute(app, new IoDeviceRouter(apiDal, configuration));
	initializeRoute(app, new DriveDeviceRouter(apiDal, configuration));
	initializeRoute(app, new SensorDeviceRouter(apiDal, configuration));
	initializeRoute(app, new PowerDeviceRouter(apiDal, configuration));
	initializeRoute(app, new ConnectionDeviceRouter(apiDal, configuration));
	initializeRoute(app, new SystemInfoDeviceRouter(apiDal, configuration));
}

function initializeRoute(app: Application, deviceRouter: DeviceRouterBase) {
	deviceRouter.initialize();
	app.use('/api/v1.0/', deviceRouter.router);
}

export function registerCommandParserFactory(app: Application, apiDal: IApiDal, configuration: IConfiguration) {
	let commandParserFactory = getCommandParserFactory();

	// populate factory
	commandParserFactory.addParser(0x18, 0x02, parseSensorStreamingDataNotifyResponse);
	commandParserFactory.addParser(0x10, 0x03, parseSendStringToConsoleResponse);

	apiDal.getCommandParserHandler = (deviceId: number, commandId: number): ICommandParserHandler | null => {
		return commandParserFactory.getParser(deviceId, commandId);
	};
}

