// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x1A
// Device Name:             io
// Device Description:      
// Command Count:           4
// Source File:             0x1A-user_io.json
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
	parseSetAllLedsRequest
} from './command-parsers/0x1A-io/0x0E-set-all-leds-command-parser'
import {
	parseSetAllLedsWith32BitMaskRequest
} from './command-parsers/0x1A-io/0x1A-set-all-leds-with-32-bit-mask-command-parser'
import {
	parseSetAllLedsWith64BitMaskRequest
} from './command-parsers/0x1A-io/0x1B-set-all-leds-with-64-bit-mask-command-parser'
import {
	parseSetAllLedsWith8BitMaskRequest
} from './command-parsers/0x1A-io/0x1C-set-all-leds-with-8-bit-mask-command-parser'


export class IoDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x1A;
	private static readonly _deviceName: string = 'Io (0x1A)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(IoDeviceRouter._deviceName, apiDal, configuration, IoDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/io/setAllLeds/:targetId')
			.put((request: Request, response: Response) =>
				this.setAllLeds(request, response));
		this.registerCommand(0x0E, 'SetAllLeds');
		
		this.router.route('/io/setAllLedsWith32BitMask/:targetId')
			.put((request: Request, response: Response) =>
				this.setAllLedsWith32BitMask(request, response));
		this.registerCommand(0x1A, 'SetAllLedsWith32BitMask');
		
		this.router.route('/io/setAllLedsWith64BitMask/:targetId')
			.put((request: Request, response: Response) =>
				this.setAllLedsWith64BitMask(request, response));
		this.registerCommand(0x1B, 'SetAllLedsWith64BitMask');
		
		this.router.route('/io/setAllLedsWith8BitMask/:targetId')
			.put((request: Request, response: Response) =>
				this.setAllLedsWith8BitMask(request, response));
		this.registerCommand(0x1C, 'SetAllLedsWith8BitMask');
	}
	
	public setAllLeds(request: Request, response: Response) {
		// DID: 0x1A | CID: 0x0E | TID(s): 1
		
		let commandId: number = 0x0E;
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
		
		let dataRawBytes: Array<number> = parseSetAllLedsRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setAllLeds while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setAllLedsWith32BitMask(request: Request, response: Response) {
		// DID: 0x1A | CID: 0x1A | TID(s): 1
		
		let commandId: number = 0x1A;
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
		
		let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setAllLedsWith64BitMask(request: Request, response: Response) {
		// DID: 0x1A | CID: 0x1B | TID(s): 1
		
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
		
		let dataRawBytes: Array<number> = parseSetAllLedsWith64BitMaskRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setAllLedsWith64BitMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setAllLedsWith8BitMask(request: Request, response: Response) {
		// DID: 0x1A | CID: 0x1C | TID(s): 1
		
		let commandId: number = 0x1C;
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
		
		let dataRawBytes: Array<number> = parseSetAllLedsWith8BitMaskRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setAllLedsWith8BitMask while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
