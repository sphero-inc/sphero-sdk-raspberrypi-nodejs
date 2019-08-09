// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x18
// Device Name:             sensor
// Device Description:      
// Command Count:           23
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
import {ByteConversionUtilities} from '../../utilities/byte-conversion-utilities'
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
	parseGetEncoderCountsResponse,
	IGetEncoderCountsResponse
} from './command-parsers/0x18-sensor/0x09-get-encoder-counts-command-parser'
import {
	parseGetEulerAnglesResponse,
	IGetEulerAnglesResponse
} from './command-parsers/0x18-sensor/0x0A-get-euler-angles-command-parser'
import {
	parseGetGyroDegreesPerSecondResponse,
	IGetGyroDegreesPerSecondResponse
} from './command-parsers/0x18-sensor/0x0B-get-gyro-degrees-per-second-command-parser'
import {
	parseSetExtendedSensorStreamingMaskRequest
} from './command-parsers/0x18-sensor/0x0C-set-extended-sensor-streaming-mask-command-parser'
import {
	parseGetExtendedSensorStreamingMaskResponse,
	IGetExtendedSensorStreamingMaskResponse
} from './command-parsers/0x18-sensor/0x0D-get-extended-sensor-streaming-mask-command-parser'
import {
	parseGetRightsideupnessResponse,
	IGetRightsideupnessResponse
} from './command-parsers/0x18-sensor/0x0E-get-rightsideupness-command-parser'
import {
	parseEnableGyroMaxNotifyRequest
} from './command-parsers/0x18-sensor/0x0F-enable-gyro-max-notify-command-parser'
import {
	parseGetBotToBotInfraredReadingsResponse,
	IGetBotToBotInfraredReadingsResponse
} from './command-parsers/0x18-sensor/0x22-get-bot-to-bot-infrared-readings-command-parser'
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
	parseGetMagnetometerChipIdResponse,
	IGetMagnetometerChipIdResponse
} from './command-parsers/0x18-sensor/0x2D-get-magnetometer-chip-id-command-parser'


export class SensorDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x18;
	private static readonly _deviceName: string = 'Sensor (0x18)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(SensorDeviceRouter._deviceName, apiDal, configuration, SensorDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/sensor/setSensorStreamingMask/:targetId')
			.put((request: Request, response: Response) =>
				this.setSensorStreamingMask(request, response));
		this.registerCommand(0x00, 'SetSensorStreamingMask');
		
		this.router.route('/sensor/getSensorStreamingMask/:targetId')
			.get((request: Request, response: Response) =>
				this.getSensorStreamingMask(request, response));
		this.registerCommand(0x01, 'GetSensorStreamingMask');
		
		this.router.route('/sensor/getEncoderCounts/:targetId')
			.get((request: Request, response: Response) =>
				this.getEncoderCounts(request, response));
		this.registerCommand(0x09, 'GetEncoderCounts');
		
		this.router.route('/sensor/getEulerAngles/:targetId')
			.get((request: Request, response: Response) =>
				this.getEulerAngles(request, response));
		this.registerCommand(0x0A, 'GetEulerAngles');
		
		this.router.route('/sensor/getGyroDegreesPerSecond/:targetId')
			.get((request: Request, response: Response) =>
				this.getGyroDegreesPerSecond(request, response));
		this.registerCommand(0x0B, 'GetGyroDegreesPerSecond');
		
		this.router.route('/sensor/setExtendedSensorStreamingMask/:targetId')
			.put((request: Request, response: Response) =>
				this.setExtendedSensorStreamingMask(request, response));
		this.registerCommand(0x0C, 'SetExtendedSensorStreamingMask');
		
		this.router.route('/sensor/getExtendedSensorStreamingMask/:targetId')
			.get((request: Request, response: Response) =>
				this.getExtendedSensorStreamingMask(request, response));
		this.registerCommand(0x0D, 'GetExtendedSensorStreamingMask');
		
		this.router.route('/sensor/getRightsideupness/:targetId')
			.get((request: Request, response: Response) =>
				this.getRightsideupness(request, response));
		this.registerCommand(0x0E, 'GetRightsideupness');
		
		this.router.route('/sensor/enableGyroMaxNotify/:targetId')
			.put((request: Request, response: Response) =>
				this.enableGyroMaxNotify(request, response));
		this.registerCommand(0x0F, 'EnableGyroMaxNotify');
		
		this.router.route('/sensor/getBotToBotInfraredReadings/:targetId')
			.get((request: Request, response: Response) =>
				this.getBotToBotInfraredReadings(request, response));
		this.registerCommand(0x22, 'GetBotToBotInfraredReadings');
		
		this.router.route('/sensor/magnetometerCalibrateToNorth/:targetId')
			.put((request: Request, response: Response) =>
				this.magnetometerCalibrateToNorth(request, response));
		this.registerCommand(0x25, 'MagnetometerCalibrateToNorth');
		
		this.router.route('/sensor/startRobotToRobotInfraredBroadcasting/:targetId')
			.put((request: Request, response: Response) =>
				this.startRobotToRobotInfraredBroadcasting(request, response));
		this.registerCommand(0x27, 'StartRobotToRobotInfraredBroadcasting');
		
		this.router.route('/sensor/startRobotToRobotInfraredFollowing/:targetId')
			.put((request: Request, response: Response) =>
				this.startRobotToRobotInfraredFollowing(request, response));
		this.registerCommand(0x28, 'StartRobotToRobotInfraredFollowing');
		
		this.router.route('/sensor/stopRobotToRobotInfraredBroadcasting/:targetId')
			.put((request: Request, response: Response) =>
				this.stopRobotToRobotInfraredBroadcasting(request, response));
		this.registerCommand(0x29, 'StopRobotToRobotInfraredBroadcasting');
		
		this.router.route('/sensor/sendRobotToRobotInfraredMessage/:targetId')
			.put((request: Request, response: Response) =>
				this.sendRobotToRobotInfraredMessage(request, response));
		this.registerCommand(0x2A, 'SendRobotToRobotInfraredMessage');
		
		this.router.route('/sensor/listenForRobotToRobotInfraredMessage/:targetId')
			.put((request: Request, response: Response) =>
				this.listenForRobotToRobotInfraredMessage(request, response));
		this.registerCommand(0x2B, 'ListenForRobotToRobotInfraredMessage');
		
		this.router.route('/sensor/getMagnetometerChipId/:targetId')
			.get((request: Request, response: Response) =>
				this.getMagnetometerChipId(request, response));
		this.registerCommand(0x2D, 'GetMagnetometerChipId');
		
		this.router.route('/sensor/runInfraredSelfTest/:targetId')
			.put((request: Request, response: Response) =>
				this.runInfraredSelfTest(request, response));
		this.registerCommand(0x2E, 'RunInfraredSelfTest');
		
	}
	
	public setSensorStreamingMask(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x00 | TID(s): 2
		console.log("<--- Starting handling of request to setSensorStreamingMask --->");
		
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
	
	public getEncoderCounts(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x09 | TID(s): 2
		
		let commandId: number = 0x09;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			let responsePayload: IGetEncoderCountsResponse = parseGetEncoderCountsResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getEncoderCounts while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getEulerAngles(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x0A | TID(s): 2
		
		let commandId: number = 0x0A;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			let responsePayload: IGetEulerAnglesResponse = parseGetEulerAnglesResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getEulerAngles while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getGyroDegreesPerSecond(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x0B | TID(s): 2
		
		let commandId: number = 0x0B;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			let responsePayload: IGetGyroDegreesPerSecondResponse = parseGetGyroDegreesPerSecondResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getGyroDegreesPerSecond while sending API Command: ${reason}`;
			
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
	
	public getRightsideupness(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x0E | TID(s): 2
		
		let commandId: number = 0x0E;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			let responsePayload: IGetRightsideupnessResponse = parseGetRightsideupnessResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getRightsideupness while sending API Command: ${reason}`;
			
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in listenForRobotToRobotInfraredMessage while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getMagnetometerChipId(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x2D | TID(s): 2
		
		let commandId: number = 0x2D;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			let responsePayload: IGetMagnetometerChipIdResponse = parseGetMagnetometerChipIdResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SensorDeviceRouter._deviceId, SensorDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getMagnetometerChipId while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public runInfraredSelfTest(request: Request, response: Response) {
		// DID: 0x18 | CID: 0x2E | TID(s): 2
		
		let commandId: number = 0x2E;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.targetId) {
			let errorCode: number = 400;
			let errorDetail: string = 'targetId is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		// No inputs...
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in runInfraredSelfTest while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
}
