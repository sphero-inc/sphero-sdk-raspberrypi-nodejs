// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x11
// Device Name:             system_info
// Device Description:      
// Command Count:           22
// Source File:             0x11-system_info.json
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
	parseGetMainApplicationVersionResponse,
	IGetMainApplicationVersionResponse
} from './command-parsers/0x11-system-info/0x00-get-main-application-version-command-parser'
import {
	parseGetBootloaderVersionResponse,
	IGetBootloaderVersionResponse
} from './command-parsers/0x11-system-info/0x01-get-bootloader-version-command-parser'
import {
	parseGetBoardRevisionResponse,
	IGetBoardRevisionResponse
} from './command-parsers/0x11-system-info/0x03-get-board-revision-command-parser'
import {
	parseGetMacAddressResponse,
	IGetMacAddressResponse
} from './command-parsers/0x11-system-info/0x06-get-mac-address-command-parser'
import {
	parseGetNordicTemperatureResponse,
	IGetNordicTemperatureResponse
} from './command-parsers/0x11-system-info/0x0E-get-nordic-temperature-command-parser'
import {
	parseGetStatsIdResponse,
	IGetStatsIdResponse
} from './command-parsers/0x11-system-info/0x13-get-stats-id-command-parser'
import {
	parseGetProcessorNameResponse,
	IGetProcessorNameResponse
} from './command-parsers/0x11-system-info/0x1F-get-processor-name-command-parser'
import {
	parseGetBootReasonResponse,
	IGetBootReasonResponse
} from './command-parsers/0x11-system-info/0x20-get-boot-reason-command-parser'
import {
	parseGetLastErrorInfoResponse,
	IGetLastErrorInfoResponse
} from './command-parsers/0x11-system-info/0x21-get-last-error-info-command-parser'
import {
	parseWriteConfigBlockResponse,
	IWriteConfigBlockResponse
} from './command-parsers/0x11-system-info/0x2B-write-config-block-command-parser'
import {
	parseGetConfigBlockResponse,
	IGetConfigBlockResponse
} from './command-parsers/0x11-system-info/0x2C-get-config-block-command-parser'
import {
	parseSetConfigBlockRequest
} from './command-parsers/0x11-system-info/0x2D-set-config-block-command-parser'
import {
	parseEraseConfigBlockRequest
} from './command-parsers/0x11-system-info/0x2E-erase-config-block-command-parser'
import {
	parseGetSwdLockingStatusResponse,
	IGetSwdLockingStatusResponse
} from './command-parsers/0x11-system-info/0x30-get-swd-locking-status-command-parser'
import {
	parseSetSwdLockingRequest
} from './command-parsers/0x11-system-info/0x31-set-swd-locking-command-parser'
import {
	parseGetManufacturingDateResponse,
	IGetManufacturingDateResponse
} from './command-parsers/0x11-system-info/0x33-get-manufacturing-date-command-parser'
import {
	parseSetManufacturingDateRequest
} from './command-parsers/0x11-system-info/0x34-set-manufacturing-date-command-parser'
import {
	parseSetSkuRequest
} from './command-parsers/0x11-system-info/0x37-set-sku-command-parser'
import {
	parseGetSkuResponse,
	IGetSkuResponse
} from './command-parsers/0x11-system-info/0x38-get-sku-command-parser'


export class SystemInfoDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x11;
	private static readonly _deviceName: string = 'SystemInfo (0x11)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(SystemInfoDeviceRouter._deviceName, apiDal, configuration, SystemInfoDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/systemInfo/getMainApplicationVersion/:targetId')
			.get((request: Request, response: Response) =>
				this.getMainApplicationVersion(request, response));
		this.registerCommand(0x00, 'GetMainApplicationVersion');
		
		this.router.route('/systemInfo/getBootloaderVersion/:targetId')
			.get((request: Request, response: Response) =>
				this.getBootloaderVersion(request, response));
		this.registerCommand(0x01, 'GetBootloaderVersion');
		
		this.router.route('/systemInfo/getBoardRevision/:targetId')
			.get((request: Request, response: Response) =>
				this.getBoardRevision(request, response));
		this.registerCommand(0x03, 'GetBoardRevision');
		
		this.router.route('/systemInfo/getMacAddress/:targetId')
			.get((request: Request, response: Response) =>
				this.getMacAddress(request, response));
		this.registerCommand(0x06, 'GetMacAddress');
		
		this.router.route('/systemInfo/getNordicTemperature/:targetId')
			.get((request: Request, response: Response) =>
				this.getNordicTemperature(request, response));
		this.registerCommand(0x0E, 'GetNordicTemperature');
		
		this.router.route('/systemInfo/getStatsId/:targetId')
			.get((request: Request, response: Response) =>
				this.getStatsId(request, response));
		this.registerCommand(0x13, 'GetStatsId');
		
		this.router.route('/systemInfo/getProcessorName/:targetId')
			.get((request: Request, response: Response) =>
				this.getProcessorName(request, response));
		this.registerCommand(0x1F, 'GetProcessorName');
		
		this.router.route('/systemInfo/getBootReason/:targetId')
			.get((request: Request, response: Response) =>
				this.getBootReason(request, response));
		this.registerCommand(0x20, 'GetBootReason');
		
		this.router.route('/systemInfo/getLastErrorInfo/:targetId')
			.get((request: Request, response: Response) =>
				this.getLastErrorInfo(request, response));
		this.registerCommand(0x21, 'GetLastErrorInfo');
		
		this.router.route('/systemInfo/requestL1Diagnostics/:targetId')
			.put((request: Request, response: Response) =>
				this.requestL1Diagnostics(request, response));
		this.registerCommand(0x26, 'RequestL1Diagnostics');
		
		this.router.route('/systemInfo/writeConfigBlock/:targetId')
			.get((request: Request, response: Response) =>
				this.writeConfigBlock(request, response));
		this.registerCommand(0x2B, 'WriteConfigBlock');
		
		this.router.route('/systemInfo/getConfigBlock/:targetId')
			.get((request: Request, response: Response) =>
				this.getConfigBlock(request, response));
		this.registerCommand(0x2C, 'GetConfigBlock');
		
		this.router.route('/systemInfo/setConfigBlock/:targetId')
			.put((request: Request, response: Response) =>
				this.setConfigBlock(request, response));
		this.registerCommand(0x2D, 'SetConfigBlock');
		
		this.router.route('/systemInfo/eraseConfigBlock/:targetId')
			.put((request: Request, response: Response) =>
				this.eraseConfigBlock(request, response));
		this.registerCommand(0x2E, 'EraseConfigBlock');
		
		this.router.route('/systemInfo/getSwdLockingStatus/:targetId')
			.get((request: Request, response: Response) =>
				this.getSwdLockingStatus(request, response));
		this.registerCommand(0x30, 'GetSwdLockingStatus');
		
		this.router.route('/systemInfo/setSwdLocking/:targetId')
			.put((request: Request, response: Response) =>
				this.setSwdLocking(request, response));
		this.registerCommand(0x31, 'SetSwdLocking');
		
		this.router.route('/systemInfo/getManufacturingDate/:targetId')
			.get((request: Request, response: Response) =>
				this.getManufacturingDate(request, response));
		this.registerCommand(0x33, 'GetManufacturingDate');
		
		this.router.route('/systemInfo/setManufacturingDate/:targetId')
			.put((request: Request, response: Response) =>
				this.setManufacturingDate(request, response));
		this.registerCommand(0x34, 'SetManufacturingDate');
		
		this.router.route('/systemInfo/setSku/:targetId')
			.put((request: Request, response: Response) =>
				this.setSku(request, response));
		this.registerCommand(0x37, 'SetSku');
		
		this.router.route('/systemInfo/getSku/:targetId')
			.get((request: Request, response: Response) =>
				this.getSku(request, response));
		this.registerCommand(0x38, 'GetSku');
	}
	
	public getMainApplicationVersion(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x00 | TID(s): 1, 2
		
		let commandId: number = 0x00;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetMainApplicationVersionResponse = parseGetMainApplicationVersionResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getMainApplicationVersion while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBootloaderVersion(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x01 | TID(s): 1, 2
		
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBootloaderVersionResponse = parseGetBootloaderVersionResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBootloaderVersion while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBoardRevision(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x03 | TID(s): 1, 2
		
		let commandId: number = 0x03;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBoardRevisionResponse = parseGetBoardRevisionResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBoardRevision while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getMacAddress(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x06 | TID(s): 1
		
		let commandId: number = 0x06;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetMacAddressResponse = parseGetMacAddressResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getMacAddress while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getNordicTemperature(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x0E | TID(s): 1
		
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetNordicTemperatureResponse = parseGetNordicTemperatureResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getNordicTemperature while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getStatsId(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x13 | TID(s): 1, 2
		
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetStatsIdResponse = parseGetStatsIdResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getStatsId while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getProcessorName(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x1F | TID(s): 1, 2
		
		let commandId: number = 0x1F;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetProcessorNameResponse = parseGetProcessorNameResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getProcessorName while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getBootReason(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x20 | TID(s): 1
		
		let commandId: number = 0x20;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetBootReasonResponse = parseGetBootReasonResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getBootReason while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getLastErrorInfo(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x21 | TID(s): 1
		
		let commandId: number = 0x21;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetLastErrorInfoResponse = parseGetLastErrorInfoResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getLastErrorInfo while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public requestL1Diagnostics(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x26 | TID(s): 1, 2
		
		let commandId: number = 0x26;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in requestL1Diagnostics while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public writeConfigBlock(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x2B | TID(s): 1, 2
		
		let commandId: number = 0x2B;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IWriteConfigBlockResponse = parseWriteConfigBlockResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in writeConfigBlock while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getConfigBlock(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x2C | TID(s): 1, 2
		
		let commandId: number = 0x2C;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetConfigBlockResponse = parseGetConfigBlockResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getConfigBlock while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setConfigBlock(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x2D | TID(s): 1, 2
		
		let commandId: number = 0x2D;
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
		
		let dataRawBytes: Array<number> = parseSetConfigBlockRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setConfigBlock while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public eraseConfigBlock(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x2E | TID(s): 1, 2
		
		let commandId: number = 0x2E;
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
		
		let dataRawBytes: Array<number> = parseEraseConfigBlockRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in eraseConfigBlock while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getSwdLockingStatus(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x30 | TID(s): 1, 2
		
		let commandId: number = 0x30;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetSwdLockingStatusResponse = parseGetSwdLockingStatusResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getSwdLockingStatus while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setSwdLocking(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x31 | TID(s): 1, 2
		
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
		
		let dataRawBytes: Array<number> = parseSetSwdLockingRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setSwdLocking while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getManufacturingDate(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x33 | TID(s): 1, 2
		
		let commandId: number = 0x33;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetManufacturingDateResponse = parseGetManufacturingDateResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getManufacturingDate while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setManufacturingDate(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x34 | TID(s): 1, 2
		
		let commandId: number = 0x34;
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
		
		let dataRawBytes: Array<number> = parseSetManufacturingDateRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setManufacturingDate while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public setSku(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x37 | TID(s): 1, 2
		
		let commandId: number = 0x37;
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
		
		let dataRawBytes: Array<number> = parseSetSkuRequest(request.body);
		
		let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
		let sourceId: number = ApiTargetsAndSources.serviceSource;
		
		this.logRequest(request.path, request.method,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			JSON.stringify(request.body)
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			dataRawBytes
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in setSku while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
	
	public getSku(request: Request, response: Response) {
		// DID: 0x11 | CID: 0x38 | TID(s): 1, 2
		
		let commandId: number = 0x38;
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
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			let responsePayload: IGetSkuResponse = parseGetSkuResponse(apiResponseMessage.dataRawBytes);
			
			this.logResponse(request.path, request.method,
				SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				JSON.stringify(responsePayload)
			);
			
			response.status(200).json(responsePayload);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in getSku while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
