// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x10
// Device Name:             api_and_shell
// Device Description:      
// Command Count:           6
// Source File:             0x10-api_and_shell.json
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
	parseEchoRequest,
	parseEchoResponse,
	IEchoResponse
} from './command-parsers/0x10-api-and-shell/0x00-echo-command-parser'
import {
	parseGetApiProtocolVersionResponse,
	IGetApiProtocolVersionResponse
} from './command-parsers/0x10-api-and-shell/0x01-get-api-protocol-version-command-parser'
import {
	parseSendCommandToShellRequest
} from './command-parsers/0x10-api-and-shell/0x02-send-command-to-shell-command-parser'
import {
	parseGetSupportedDidsResponse,
	IGetSupportedDidsResponse
} from './command-parsers/0x10-api-and-shell/0x05-get-supported-dids-command-parser'
import {
	parseGetSupportedCidsRequest,
	parseGetSupportedCidsResponse,
	IGetSupportedCidsResponse
} from './command-parsers/0x10-api-and-shell/0x06-get-supported-cids-command-parser'


export class ApiAndShellDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x10;
	private static readonly _deviceName: string = 'ApiAndShell (0x10)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(ApiAndShellDeviceRouter._deviceName, apiDal, configuration, ApiAndShellDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/apiAndShell/echo/:targetId')
			.get((request: Request, response: Response) =>
				this.echo(request, response));
		this.registerCommand(0x00, 'Echo');
		
		this.router.route('/apiAndShell/getApiProtocolVersion/:targetId')
			.get((request: Request, response: Response) =>
				this.getApiProtocolVersion(request, response));
		this.registerCommand(0x01, 'GetApiProtocolVersion');
		
		this.router.route('/apiAndShell/sendCommandToShell/:targetId')
			.put((request: Request, response: Response) =>
				this.sendCommandToShell(request, response));
		this.registerCommand(0x02, 'SendCommandToShell');
		
		this.router.route('/apiAndShell/getSupportedDids/:targetId')
			.get((request: Request, response: Response) =>
				this.getSupportedDids(request, response));
		this.registerCommand(0x05, 'GetSupportedDids');
		
		this.router.route('/apiAndShell/getSupportedCids/:targetId')
			.get((request: Request, response: Response) =>
				this.getSupportedCids(request, response));
		this.registerCommand(0x06, 'GetSupportedCids');
	}
	
	public echo(request: Request, response: Response) {
		// DID: 0x10 | CID: 0x00 | TID(s): 1, 2
		
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
		
		let dataRawBytes: Array<number> = parseEchoRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IEchoResponse = parseEchoResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in echo while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getApiProtocolVersion(request: Request, response: Response) {
		// DID: 0x10 | CID: 0x01 | TID(s): 1, 2
		
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
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetApiProtocolVersionResponse = parseGetApiProtocolVersionResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getApiProtocolVersion while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public sendCommandToShell(request: Request, response: Response) {
		// DID: 0x10 | CID: 0x02 | TID(s): 1, 2
		
		let commandId: number = 0x02;
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
		
		let dataRawBytes: Array<number> = parseSendCommandToShellRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in sendCommandToShell while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getSupportedDids(request: Request, response: Response) {
		// DID: 0x10 | CID: 0x05 | TID(s): 1, 2
		
		let commandId: number = 0x05;
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
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetSupportedDidsResponse = parseGetSupportedDidsResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getSupportedDids while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getSupportedCids(request: Request, response: Response) {
		// DID: 0x10 | CID: 0x06 | TID(s): 1, 2
		
		let commandId: number = 0x06;
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
		
		let dataRawBytes: Array<number> = parseGetSupportedCidsRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetSupportedCidsResponse = parseGetSupportedCidsResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				ApiAndShellDeviceRouter._deviceId, ApiAndShellDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getSupportedCids while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
