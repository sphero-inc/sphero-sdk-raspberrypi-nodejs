// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x18
// Device Name:             sensor
// Device Description:      
// Command Count:           16
// Source File:             0x18-sensors.json
// ************************************************************

// external imports
import {Request, Response} from 'express';

// internal imports
import {DeviceRouterBase} from '../device-router-base';
import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../../models/api-command-message';
import {IApiResponseMessage} from '../../models/api-response-message';
import {IConfiguration} from '../../configuration';
import {IApiDal} from '../../modules/api-dal-interface';
import {ApiTargetsAndSources} from '../../constants';

// command parsers
import {
	parseSetSensorStreamingMaskRequest
} from './command-parsers/0x18-sensor/0x00-set-sensor-streaming-mask-command-parser'
import {
	parseGetSensorStreamingMaskResponse,
	IGetSensorStreamingMaskResponse
} from './command-parsers/0x18-sensor/0x01-get-sensor-streaming-mask-command-parser'
import {
	parseSensorStreamingDataNotifyResponse,
	ISensorStreamingDataNotifyResponse
} from './command-parsers/0x18-sensor/0x02-sensor-streaming-data-notify-command-parser'
import {
	parseSetExtendedSensorStreamingMaskRequest
} from './command-parsers/0x18-sensor/0x0C-set-extended-sensor-streaming-mask-command-parser'
import {
	parseGetExtendedSensorStreamingMaskResponse,
	IGetExtendedSensorStreamingMaskResponse
} from './command-parsers/0x18-sensor/0x0D-get-extended-sensor-streaming-mask-command-parser'
import {
	parseEnableGyroMaxNotifyRequest
} from './command-parsers/0x18-sensor/0x0F-enable-gyro-max-notify-command-parser'
import {
	parseGyroMaxNotifyResponse,
	IGyroMaxNotifyResponse
} from './command-parsers/0x18-sensor/0x10-gyro-max-notify-command-parser'
import {
	parseGetBotToBotInfraredReadingsResponse,
	IGetBotToBotInfraredReadingsResponse
} from './command-parsers/0x18-sensor/0x22-get-bot-to-bot-infrared-readings-command-parser'
import {
	parseMagnetometerNorthYawNotifyResponse,
	IMagnetometerNorthYawNotifyResponse
} from './command-parsers/0x18-sensor/0x26-magnetometer-north-yaw-notify-command-parser'
import {
	parseStartRobotToRobotInfraredBroadcastingRequest
} from './command-parsers/0x18-sensor/0x27-start-robot-to-robot-infrared-broadcasting-command-parser'
import {
	parseStartRobotToRobotInfraredFollowingRequest
} from './command-parsers/0x18-sensor/0x28-start-robot-to-robot-infrared-following-command-parser'
import {
	parseSendRobotToRobotInfraredMessageRequest
} from './command-parsers/0x18-sensor/0x2A-send-robot-to-robot-infrared-message-command-parser'
import {
	parseListenForRobotToRobotInfraredMessageRequest
} from './command-parsers/0x18-sensor/0x2B-listen-for-robot-to-robot-infrared-message-command-parser'
import {
	parseRobotToRobotInfraredMessageReceivedNotifyResponse,
	IRobotToRobotInfraredMessageReceivedNotifyResponse
} from './command-parsers/0x18-sensor/0x2C-robot-to-robot-infrared-message-received-notify-command-parser'


export class SensorDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x18;
	private static readonly _deviceName: string = 'Sensor (0x18)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(SensorDeviceRouter._deviceName, apiDal, configuration, SensorDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/sensor/setSensorStreamingMask')
			.put((request: Request, response: Response) =>
				this.setSensorStreamingMask(request, response));
		this.registerCommand(0x00, 'SetSensorStreamingMask');
		
		this.router.route('/sensor/getSensorStreamingMask')
			.get((request: Request, response: Response) =>
				this.getSensorStreamingMask(request, response));
		this.registerCommand(0x01, 'GetSensorStreamingMask');
		
		this.router.route('/sensor/setExtendedSensorStreamingMask')
			.put((request: Request, response: Response) =>
				this.setExtendedSensorStreamingMask(request, response));
		this.registerCommand(0x0C, 'SetExtendedSensorStreamingMask');
		
		this.router.route('/sensor/getExtendedSensorStreamingMask')
			.get((request: Request, response: Response) =>
				this.getExtendedSensorStreamingMask(request, response));
		this.registerCommand(0x0D, 'GetExtendedSensorStreamingMask');
		
		this.router.route('/sensor/enableGyroMaxNotify')
			.put((request: Request, response: Response) =>
				this.enableGyroMaxNotify(request, response));
		this.registerCommand(0x0F, 'EnableGyroMaxNotify');
		
		this.router.route('/sensor/getBotToBotInfraredReadings')
			.get((request: Request, response: Response) =>
				this.getBotToBotInfraredReadings(request, response));
		this.registerCommand(0x22, 'GetBotToBotInfraredReadings');
		
		this.router.route('/sensor/magnetometerCalibrateToNorth')
			.put((request: Request, response: Response) =>
				this.magnetometerCalibrateToNorth(request, response));
		this.registerCommand(0x25, 'MagnetometerCalibrateToNorth');
		
		this.router.route('/sensor/startRobotToRobotInfraredBroadcasting')
			.put((request: Request, response: Response) =>
				this.startRobotToRobotInfraredBroadcasting(request, response));
		this.registerCommand(0x27, 'StartRobotToRobotInfraredBroadcasting');
		
		this.router.route('/sensor/startRobotToRobotInfraredFollowing')
			.put((request: Request, response: Response) =>
				this.startRobotToRobotInfraredFollowing(request, response));
		this.registerCommand(0x28, 'StartRobotToRobotInfraredFollowing');
		
		this.router.route('/sensor/stopRobotToRobotInfraredBroadcasting')
			.put((request: Request, response: Response) =>
				this.stopRobotToRobotInfraredBroadcasting(request, response));
		this.registerCommand(0x29, 'StopRobotToRobotInfraredBroadcasting');
		
		this.router.route('/sensor/sendRobotToRobotInfraredMessage')
			.put((request: Request, response: Response) =>
				this.sendRobotToRobotInfraredMessage(request, response));
		this.registerCommand(0x2A, 'SendRobotToRobotInfraredMessage');
		
		this.router.route('/sensor/listenForRobotToRobotInfraredMessage')
			.put((request: Request, response: Response) =>
				this.listenForRobotToRobotInfraredMessage(request, response));
		this.registerCommand(0x2B, 'ListenForRobotToRobotInfraredMessage');
		
	}
	
	public setSensorStreamingMask(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x00 | TID(s): 2
		
		let commandId: number = 0x00;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseSetSensorStreamingMaskRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setSensorStreamingMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getSensorStreamingMask(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x01 | TID(s): 2
		
		let commandId: number = 0x01;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetSensorStreamingMaskResponse = parseGetSensorStreamingMaskResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getSensorStreamingMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setExtendedSensorStreamingMask(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x0C | TID(s): 2
		
		let commandId: number = 0x0C;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseSetExtendedSensorStreamingMaskRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setExtendedSensorStreamingMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getExtendedSensorStreamingMask(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x0D | TID(s): 2
		
		let commandId: number = 0x0D;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetExtendedSensorStreamingMaskResponse = parseGetExtendedSensorStreamingMaskResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getExtendedSensorStreamingMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public enableGyroMaxNotify(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x0F | TID(s): 2
		
		let commandId: number = 0x0F;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseEnableGyroMaxNotifyRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enableGyroMaxNotify while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBotToBotInfraredReadings(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x22 | TID(s): 2
		
		let commandId: number = 0x22;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBotToBotInfraredReadingsResponse = parseGetBotToBotInfraredReadingsResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBotToBotInfraredReadings while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public magnetometerCalibrateToNorth(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x25 | TID(s): 2
		
		let commandId: number = 0x25;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in magnetometerCalibrateToNorth while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public startRobotToRobotInfraredBroadcasting(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x27 | TID(s): 2
		
		let commandId: number = 0x27;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseStartRobotToRobotInfraredBroadcastingRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in startRobotToRobotInfraredBroadcasting while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public startRobotToRobotInfraredFollowing(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x28 | TID(s): 2
		
		let commandId: number = 0x28;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseStartRobotToRobotInfraredFollowingRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in startRobotToRobotInfraredFollowing while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public stopRobotToRobotInfraredBroadcasting(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x29 | TID(s): 2
		
		let commandId: number = 0x29;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in stopRobotToRobotInfraredBroadcasting while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public sendRobotToRobotInfraredMessage(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x2A | TID(s): 2
		
		let commandId: number = 0x2A;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseSendRobotToRobotInfraredMessageRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in sendRobotToRobotInfraredMessage while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public listenForRobotToRobotInfraredMessage(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x2B | TID(s): 2
		
		let commandId: number = 0x2B;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		if (!request.body) {
			let errorCode: number = 400;
			let errorDetail: string = 'Payload is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let dataRawBytes: Array<number> = parseListenForRobotToRobotInfraredMessageRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in listenForRobotToRobotInfraredMessage while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
}
