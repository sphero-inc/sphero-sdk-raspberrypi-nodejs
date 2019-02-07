// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x19
// Device Name:             connection
// Device Description:      
// Command Count:           2
// Source File:             0x19-peer_connection.json
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
	parseSetBluetoothNameRequest
} from './command-parsers/0x19-connection/0x03-set-bluetooth-name-command-parser'
import {
	parseGetBluetoothNameResponse,
	IGetBluetoothNameResponse
} from './command-parsers/0x19-connection/0x04-get-bluetooth-name-command-parser'


export class ConnectionDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x19;
	private static readonly _deviceName: string = 'Connection (0x19)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(ConnectionDeviceRouter._deviceName, apiDal, configuration, ConnectionDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/connection/setBluetoothName/:targetId')
			.put((request: Request, response: Response) =>
				this.setBluetoothName(request, response));
		this.registerCommand(0x03, 'SetBluetoothName');
		
		this.router.route('/connection/getBluetoothName/:targetId')
			.get((request: Request, response: Response) =>
				this.getBluetoothName(request, response));
		this.registerCommand(0x04, 'GetBluetoothName');
	}
	
	public setBluetoothName(request: Request, response: Response) {
		// DID: 0x19 | CID: 0x03 | TID(s): 1, 2
		
		let commandId: number = 0x03;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.toyPrefix) {
			let errorCode: number = 400;
			let errorDetail: string = 'toyPrefix is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let toyPrefix: string = request.params.toyPrefix;
		
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
		
		let dataRawBytes: Array<number> = parseSetBluetoothNameRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method, toyPrefix,
			ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method, toyPrefix,
				ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setBluetoothName while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBluetoothName(request: Request, response: Response) {
		// DID: 0x19 | CID: 0x04 | TID(s): 1, 2
		
		let commandId: number = 0x04;
		let commandName: string = this.getCommandName(commandId);
		
		if (!request.params.toyPrefix) {
			let errorCode: number = 400;
			let errorDetail: string = 'toyPrefix is required!';
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
			
			return;
		}
		
		let toyPrefix: string = request.params.toyPrefix;
		
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
		
		this.logRequest(request.path, request.method, toyPrefix,
			ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBluetoothNameResponse = parseGetBluetoothNameResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method, toyPrefix,
				ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBluetoothName while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
