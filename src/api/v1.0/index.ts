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
import {parseMotorStallNotifyResponse} from './command-parsers/0x16-drive/0x26-motor-stall-notify-command-parser';
import {parseMotorFaultNotifyResponse} from './command-parsers/0x16-drive/0x28-motor-fault-notify-command-parser';
import {parseGyroMaxNotifyResponse} from './command-parsers/0x18-sensor/0x10-gyro-max-notify-command-parser';
import {parseMagnetometerNorthYawNotifyResponse} from './command-parsers/0x18-sensor/0x26-magnetometer-north-yaw-notify-command-parser';
import {parseRobotToRobotInfraredMessageReceivedNotifyResponse} from './command-parsers/0x18-sensor/0x2C-robot-to-robot-infrared-message-received-notify-command-parser';
import {parseColorDetectionNotifyResponse} from './command-parsers/0x18-sensor/0x36-color-detection-notify-command-parser';
import {parseStreamingServiceDataNotifyResponse} from './command-parsers/0x18-sensor/0x3D-streaming-service-data-notify-command-parser';
import {parseMotorCurrentNotifyResponse} from './command-parsers/0x18-sensor/0x40-motor-current-notify-command-parser';
import {parseMotorThermalProtectionStatusNotifyResponse} from './command-parsers/0x18-sensor/0x4D-motor-thermal-protection-status-notify-command-parser';
import {parseBatteryVoltageStateChangeNotifyResponse} from './command-parsers/0x13-power/0x1C-battery-voltage-state-change-notify-command-parser';


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
    
    commandParserFactory.addParser(2, 0x16, 0x26, parseMotorStallNotifyResponse);
    commandParserFactory.addParser(2, 0x16, 0x28, parseMotorFaultNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x10, parseGyroMaxNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x26, parseMagnetometerNorthYawNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x2C, parseRobotToRobotInfraredMessageReceivedNotifyResponse);
    commandParserFactory.addParser(1, 0x18, 0x36, parseColorDetectionNotifyResponse);
    commandParserFactory.addParser(1, 0x18, 0x3D, parseStreamingServiceDataNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x3D, parseStreamingServiceDataNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x40, parseMotorCurrentNotifyResponse);
    commandParserFactory.addParser(2, 0x18, 0x4D, parseMotorThermalProtectionStatusNotifyResponse);
    commandParserFactory.addParser(1, 0x13, 0x1C, parseBatteryVoltageStateChangeNotifyResponse);
    
    apiDal.getCommandParserHandler = (sourceId: number, deviceId: number, commandId: number): ICommandParserHandler | null => {
        return commandParserFactory.getParser(sourceId, deviceId, commandId);
    }
}

