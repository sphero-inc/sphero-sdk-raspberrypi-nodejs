// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x1F
// Device Name:             factory_test
// Device Description:      
// Command Count:           8
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
import {ByteConversionUtilities} from '../../utilities/byte-conversion-utilities'
import {ApiTargetsAndSources} from '../../constants';

// command parsers
import {
	parseSetTestFixtureResultRequest
} from './command-parsers/0x1F-factory-test/0x11-set-test-fixture-result-command-parser'
import {
	parseGetTestFixtureResultRequest,
	parseGetTestFixtureResultResponse,
	IGetTestFixtureResultResponse
} from './command-parsers/0x1F-factory-test/0x12-get-test-fixture-result-command-parser'
import {
	parseGetFactoryModeChallengeResponse,
	IGetFactoryModeChallengeResponse
} from './command-parsers/0x1F-factory-test/0x13-get-factory-mode-challenge-command-parser'
import {
	parseEnterFactoryModeRequest
} from './command-parsers/0x1F-factory-test/0x14-enter-factory-mode-command-parser'
import {
	parseGetChassisIdResponse,
	IGetChassisIdResponse
} from './command-parsers/0x1F-factory-test/0x27-get-chassis-id-command-parser'
import {
	parseEnableExtendedLifeTestRequest
} from './command-parsers/0x1F-factory-test/0x31-enable-extended-life-test-command-parser'
import {
	parseGetFactoryModeStatusResponse,
	IGetFactoryModeStatusResponse
} from './command-parsers/0x1F-factory-test/0x34-get-factory-mode-status-command-parser'


export class FactoryTestDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x1F;
	private static readonly _deviceName: string = 'FactoryTest (0x1F)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(FactoryTestDeviceRouter._deviceName, apiDal, configuration, FactoryTestDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/factoryTest/setTestFixtureResult/:targetId')
			.put((request: Request, response: Response) =>
				this.setTestFixtureResult(request, response));
		this.registerCommand(0x11, 'SetTestFixtureResult');
		
		this.router.route('/factoryTest/getTestFixtureResult/:targetId')
			.get((request: Request, response: Response) =>
				this.getTestFixtureResult(request, response));
		this.registerCommand(0x12, 'GetTestFixtureResult');
		
		this.router.route('/factoryTest/getFactoryModeChallenge/:targetId')
			.get((request: Request, response: Response) =>
				this.getFactoryModeChallenge(request, response));
		this.registerCommand(0x13, 'GetFactoryModeChallenge');
		
		this.router.route('/factoryTest/enterFactoryMode/:targetId')
			.put((request: Request, response: Response) =>
				this.enterFactoryMode(request, response));
		this.registerCommand(0x14, 'EnterFactoryMode');
		
		this.router.route('/factoryTest/exitFactoryMode/:targetId')
			.put((request: Request, response: Response) =>
				this.exitFactoryMode(request, response));
		this.registerCommand(0x15, 'ExitFactoryMode');
		
		this.router.route('/factoryTest/getChassisId/:targetId')
			.get((request: Request, response: Response) =>
				this.getChassisId(request, response));
		this.registerCommand(0x27, 'GetChassisId');
		
		this.router.route('/factoryTest/enableExtendedLifeTest/:targetId')
			.put((request: Request, response: Response) =>
				this.enableExtendedLifeTest(request, response));
		this.registerCommand(0x31, 'EnableExtendedLifeTest');
		
		this.router.route('/factoryTest/getFactoryModeStatus/:targetId')
			.get((request: Request, response: Response) =>
				this.getFactoryModeStatus(request, response));
		this.registerCommand(0x34, 'GetFactoryModeStatus');
	}
	
	public setTestFixtureResult(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x11 | TID(s): 1
		
		let commandId: number = 0x11;
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
		
		let dataRawBytes: Array<number> = parseSetTestFixtureResultRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setTestFixtureResult while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getTestFixtureResult(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x12 | TID(s): 1
		
		let commandId: number = 0x12;
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
		
		let dataRawBytes: Array<number> = parseGetTestFixtureResultRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetTestFixtureResultResponse = parseGetTestFixtureResultResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getTestFixtureResult while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getFactoryModeChallenge(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x13 | TID(s): 1, 2
		
		let commandId: number = 0x13;
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
			let responsePayload: IGetFactoryModeChallengeResponse = parseGetFactoryModeChallengeResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getFactoryModeChallenge while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public enterFactoryMode(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x14 | TID(s): 1, 2
		
		let commandId: number = 0x14;
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
		
		let dataRawBytes: Array<number> = parseEnterFactoryModeRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enterFactoryMode while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public exitFactoryMode(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x15 | TID(s): 1, 2
		
		let commandId: number = 0x15;
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
			// No outputs...
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in exitFactoryMode while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
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
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
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
	
	public enableExtendedLifeTest(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x31 | TID(s): 1
		
		let commandId: number = 0x31;
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
		
		let dataRawBytes: Array<number> = parseEnableExtendedLifeTestRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in enableExtendedLifeTest while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getFactoryModeStatus(request: Request, response: Response) {
		// DID: 0x1F | CID: 0x34 | TID(s): 1, 2
		
		let commandId: number = 0x34;
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
			let responsePayload: IGetFactoryModeStatusResponse = parseGetFactoryModeStatusResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				FactoryTestDeviceRouter._deviceId, FactoryTestDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getFactoryModeStatus while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
