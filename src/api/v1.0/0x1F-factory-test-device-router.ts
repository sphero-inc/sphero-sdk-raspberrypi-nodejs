// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x1F
// Device Name:             factory_test
// Device Description:      
// Command Count:           1
// Source File:             0x1F-factory_testing.json
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
	parseGetChassisIdResponse,
	IGetChassisIdResponse
} from './command-parsers/0x1F-factory-test/0x27-get-chassis-id-command-parser'


export class FactoryTestDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x1F;
	private static readonly _deviceName: string = 'FactoryTest (0x1F)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(FactoryTestDeviceRouter._deviceName, apiDal, configuration, FactoryTestDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/factoryTest/getChassisId/:targetId')
			.get((request: Request, response: Response) =>
				this.getChassisId(request, response));
		this.registerCommand(0x27, 'GetChassisId');
	}
	
	public getChassisId(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x27 | TID(s): 1, 2
		
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
		
		let targetId: number = parseInt(request.params.targetId);
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetChassisIdResponse = parseGetChassisIdResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getChassisId while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
