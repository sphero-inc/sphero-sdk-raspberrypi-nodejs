// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x12
// Device Name:             system_mode
// Device Description:      
// Command Count:           3
// Source File:             0x12-system_modes.json
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
	parseEnablePlayModeChangeNotifyResponse,
	IEnablePlayModeChangeNotifyResponse
} from './command-parsers/0x12-system-mode/0x02-enable-play-mode-change-notify-command-parser'
import {
	parseSetPlayModeRequest
} from './command-parsers/0x12-system-mode/0x26-set-play-mode-command-parser'
import {
	parseGetPlayModeResponse,
	IGetPlayModeResponse
} from './command-parsers/0x12-system-mode/0x27-get-play-mode-command-parser'


export class SystemModeDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x12;
	private static readonly _deviceName: string = 'SystemMode (0x12)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(SystemModeDeviceRouter._deviceName, apiDal, configuration, SystemModeDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/systemMode/enablePlayModeChangeNotify/:targetId')
			.get((request: Request, response: Response) =>
				this.enablePlayModeChangeNotify(request, response));
		this.registerCommand(0x02, 'EnablePlayModeChangeNotify');
		
		this.router.route('/systemMode/setPlayMode/:targetId')
			.put((request: Request, response: Response) =>
				this.setPlayMode(request, response));
		this.registerCommand(0x26, 'SetPlayMode');
		
		this.router.route('/systemMode/getPlayMode/:targetId')
			.get((request: Request, response: Response) =>
				this.getPlayMode(request, response));
		this.registerCommand(0x27, 'GetPlayMode');
	}
	
	public enablePlayModeChangeNotify(request: Request, response: Response) {
		// DID: 0x12 | CID: 0x02 | TID(s): 1
		
		let commandId: number = 0x02;
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
			SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IEnablePlayModeChangeNotifyResponse = parseEnablePlayModeChangeNotifyResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enablePlayModeChangeNotify while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setPlayMode(request: Request, response: Response) {
		// DID: 0x12 | CID: 0x26 | TID(s): 1
		
		let commandId: number = 0x26;
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
		
		let dataRawBytes: Array<number> = parseSetPlayModeRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setPlayMode while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getPlayMode(request: Request, response: Response) {
		// DID: 0x12 | CID: 0x27 | TID(s): 1
		
		let commandId: number = 0x27;
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
			SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetPlayModeResponse = parseGetPlayModeResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemModeDeviceRouter._deviceId, SystemModeDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getPlayMode while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
