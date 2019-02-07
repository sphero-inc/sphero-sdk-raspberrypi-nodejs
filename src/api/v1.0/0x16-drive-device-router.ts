// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x16
// Device Name:             drive
// Device Description:      
// Command Count:           4
// Source File:             0x16-driving.json
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
	parseSetRawMotorsRequest
} from './command-parsers/0x16-drive/0x01-set-raw-motors-command-parser'
import {
	parseDriveWithHeadingRequest
} from './command-parsers/0x16-drive/0x07-drive-with-heading-command-parser'
import {
	parseSetStabilizationRequest
} from './command-parsers/0x16-drive/0x0C-set-stabilization-command-parser'


export class DriveDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x16;
	private static readonly _deviceName: string = 'Drive (0x16)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(DriveDeviceRouter._deviceName, apiDal, configuration, DriveDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/drive/setRawMotors')
			.put((request: Request, response: Response) =>
				this.setRawMotors(request, response));
		this.registerCommand(0x01, 'SetRawMotors');
		
		this.router.route('/drive/resetYaw')
			.put((request: Request, response: Response) =>
				this.resetYaw(request, response));
		this.registerCommand(0x06, 'ResetYaw');
		
		this.router.route('/drive/driveWithHeading')
			.put((request: Request, response: Response) =>
				this.driveWithHeading(request, response));
		this.registerCommand(0x07, 'DriveWithHeading');
		
		this.router.route('/drive/setStabilization')
			.put((request: Request, response: Response) =>
				this.setStabilization(request, response));
		this.registerCommand(0x0C, 'SetStabilization');
	}
	
	public setRawMotors(request: Request, response: Response) {
		// DID: 0x16 | CID: 0x01 | TID(s): 2
		
		let commandId: number = 0x01;
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
		
		let dataRawBytes: Array<number> = parseSetRawMotorsRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method, toyPrefix,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method, toyPrefix,
				DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setRawMotors while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public resetYaw(request: Request, response: Response) {
		// DID: 0x16 | CID: 0x06 | TID(s): 2
		
		let commandId: number = 0x06;
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
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method, toyPrefix,
				DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in resetYaw while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public driveWithHeading(request: Request, response: Response) {
		// DID: 0x16 | CID: 0x07 | TID(s): 2
		
		let commandId: number = 0x07;
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
		
		let dataRawBytes: Array<number> = parseDriveWithHeadingRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method, toyPrefix,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method, toyPrefix,
				DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in driveWithHeading while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setStabilization(request: Request, response: Response) {
		// DID: 0x16 | CID: 0x0C | TID(s): 2
		
		let commandId: number = 0x0C;
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
		
		let dataRawBytes: Array<number> = parseSetStabilizationRequest(request.body);
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method, toyPrefix,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method, toyPrefix,
				DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.status(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setStabilization while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
