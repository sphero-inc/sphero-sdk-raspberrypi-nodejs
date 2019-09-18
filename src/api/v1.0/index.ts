// external imports
import {Application} from 'express';

// internal imports
import {createLogger, ILogger} from '../../modules/logger';
import {IConfiguration} from '../../configuration';
import {DeviceRouterBase} from '../device-router-base';
import {IApiDal} from '../../modules/api-dal-interface';
import {ICommandParserHandler, getCommandParserFactory} from '../../modules/command-parser-factory';

// route imports
import {ApiAndShellDeviceRouter} from './0x10-api-and-shell-device-router';
import {IoDeviceRouter} from './0x1A-io-device-router';
import {DriveDeviceRouter} from './0x16-drive-device-router';
import {SensorDeviceRouter} from './0x18-sensor-device-router';
import {PowerDeviceRouter} from './0x13-power-device-router';
import {ConnectionDeviceRouter} from './0x19-connection-device-router';
import {SystemInfoDeviceRouter} from './0x11-system-info-device-router';

// command parsers
import {parseCompressedFramePlayerAnimationCompleteNotifyResponse} from './command-parsers/0x1A-io/0x3F-compressed-frame-player-animation-complete-notify-command-parser';
import {parseGyroMaxNotifyResponse} from './command-parsers/0x18-sensor/0x10-gyro-max-notify-command-parser';
import {parseMagnetometerNorthYawNotifyResponse} from './command-parsers/0x18-sensor/0x26-magnetometer-north-yaw-notify-command-parser';
import {parseRobotToRobotInfraredMessageReceivedNotifyResponse} from './command-parsers/0x18-sensor/0x2C-robot-to-robot-infrared-message-received-notify-command-parser';
import {parseColorDetectionNotifyResponse} from './command-parsers/0x18-sensor/0x36-color-detection-notify-command-parser';
// import {parseWillSleepNotifyResponse} from './command-parsers/0x13-power/0x19-will-sleep-notify-command-parser';
// import {parseDidSleepNotifyResponse} from './command-parsers/0x13-power/0x1A-did-sleep-notify-command-parser';
import {parseBatteryVoltageStateChangeNotifyResponse} from './command-parsers/0x13-power/0x1C-battery-voltage-state-change-notify-command-parser';
import {parseSosMessageNotifyResponse} from './command-parsers/0x11-system-info/0x3E-sos-message-notify-command-parser';


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

    commandParserFactory.addParser(1, 0x1A, 0x3F, parseCompressedFramePlayerAnimationCompleteNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x10, parseGyroMaxNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x26, parseMagnetometerNorthYawNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x2C, parseRobotToRobotInfraredMessageReceivedNotifyResponse);
    commandParserFactory.addParser(1, 0x18, 0x36, parseColorDetectionNotifyResponse);
    // commandParserFactory.addParser(1, 0x13, 0x19, parseWillSleepNotifyResponse);
    // commandParserFactory.addParser(1, 0x13, 0x1A, parseDidSleepNotifyResponse);
    commandParserFactory.addParser(1, 0x13, 0x1C, parseBatteryVoltageStateChangeNotifyResponse);
    commandParserFactory.addParser(1, 0x11, 0x3E, parseSosMessageNotifyResponse);

    apiDal.getCommandParserHandler = (sourceId: number, deviceId: number, commandId: number): ICommandParserHandler | null => {
        return commandParserFactory.getParser(sourceId, deviceId, commandId);
    }
}

