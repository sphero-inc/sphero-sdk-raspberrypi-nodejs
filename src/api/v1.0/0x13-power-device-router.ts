// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x13
// Device Name:             power
// Device Description:      
// Command Count:           12
// Source File:             0x13-power.json
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
	parseEnterDeepSleepRequest
} from './command-parsers/0x13-power/0x00-enter-deep-sleep-command-parser'
import {
	parseGetBatteryPercentageResponse,
	IGetBatteryPercentageResponse
} from './command-parsers/0x13-power/0x10-get-battery-percentage-command-parser'
import {
	parseGetBatteryVoltageStateResponse,
	IGetBatteryVoltageStateResponse
} from './command-parsers/0x13-power/0x17-get-battery-voltage-state-command-parser'
import {
	parseEnableBatteryVoltageStateChangeNotifyRequest
} from './command-parsers/0x13-power/0x1B-enable-battery-voltage-state-change-notify-command-parser'


export class PowerDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x13;
	private static readonly _deviceName: string = 'Power (0x13)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(PowerDeviceRouter._deviceName, apiDal, configuration, PowerDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/power/enterDeepSleep/:targetId')
			.put((request: Request, response: Response) =>
				this.enterDeepSleep(request, response));
		this.registerCommand(0x00, 'EnterDeepSleep');
		
		this.router.route('/power/enterSoftSleep/:targetId')
			.put((request: Request, response: Response) =>
				this.enterSoftSleep(request, response));
		this.registerCommand(0x01, 'EnterSoftSleep');
		
		this.router.route('/power/prepareForShutdown/:targetId')
			.put((request: Request, response: Response) =>
				this.prepareForShutdown(request, response));
		this.registerCommand(0x0A, 'PrepareForShutdown');
		
		this.router.route('/power/forceBatteryRefresh/:targetId')
			.put((request: Request, response: Response) =>
				this.forceBatteryRefresh(request, response));
		this.registerCommand(0x0C, 'ForceBatteryRefresh');
		
		this.router.route('/power/wake/:targetId')
			.put((request: Request, response: Response) =>
				this.wake(request, response));
		this.registerCommand(0x0D, 'Wake');
		
		this.router.route('/power/getBatteryPercentage/:targetId')
			.get((request: Request, response: Response) =>
				this.getBatteryPercentage(request, response));
		this.registerCommand(0x10, 'GetBatteryPercentage');
		
		this.router.route('/power/getBatteryVoltageState/:targetId')
			.get((request: Request, response: Response) =>
				this.getBatteryVoltageState(request, response));
		this.registerCommand(0x17, 'GetBatteryVoltageState');
		
		this.router.route('/power/enableBatteryVoltageStateChangeNotify/:targetId')
			.put((request: Request, response: Response) =>
				this.enableBatteryVoltageStateChangeNotify(request, response));
		this.registerCommand(0x1B, 'EnableBatteryVoltageStateChangeNotify');
		
	}
	
	public enterDeepSleep(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x00 | TID(s): 1
		
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
		
		let dataRawBytes: Array<number> = parseEnterDeepSleepRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enterDeepSleep while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public enterSoftSleep(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x01 | TID(s): 1
		
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
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enterSoftSleep while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public prepareForShutdown(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x0A | TID(s): 2
		
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
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in prepareForShutdown while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public forceBatteryRefresh(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x0C | TID(s): 1
		
		let commandId: number = 0x0C;
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
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in forceBatteryRefresh while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public wake(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x0D | TID(s): 1
		
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
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in wake while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBatteryPercentage(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x10 | TID(s): 1
		
		let commandId: number = 0x10;
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
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBatteryPercentageResponse = parseGetBatteryPercentageResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBatteryPercentage while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBatteryVoltageState(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x17 | TID(s): 1
		
		let commandId: number = 0x17;
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
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBatteryVoltageStateResponse = parseGetBatteryVoltageStateResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBatteryVoltageState while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public enableBatteryVoltageStateChangeNotify(request: Request, response: Response) {
		// DID: 0x13 | CID: 0x1B | TID(s): 1
		
		let commandId: number = 0x1B;
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
		
		let dataRawBytes: Array<number> = parseEnableBatteryVoltageStateChangeNotifyRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enableBatteryVoltageStateChangeNotify while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
}
