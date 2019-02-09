// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x1D
// Device Name:             firmware
// Device Description:      
// Command Count:           1
// Source File:             0x1D-secondary_mcu_firmware_update.json
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


export class FirmwareDeviceRouter extends DeviceRouterBase {
	private static readonly _deviceId: number = 0x1D;
	private static readonly _deviceName: string = 'Firmware (0x1D)';
	
	constructor(apiDal: IApiDal, configuration: IConfiguration) {
		super(FirmwareDeviceRouter._deviceName, apiDal, configuration, FirmwareDeviceRouter._deviceId);
	}
	
	protected initializeRoutes(): void {
		this.router.route('/firmware/jumpToBootloader/:targetId')
			.put((request: Request, response: Response) =>
				this.jumpToBootloader(request, response));
		this.registerCommand(0x05, 'JumpToBootloader');
	}
	
	public jumpToBootloader(request: Request, response: Response) {
		// DID: 0x1D | CID: 0x05 | TID(s): 2
		
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
			FirmwareDeviceRouter._deviceId, FirmwareDeviceRouter._deviceName,
			commandId, commandName,
			sourceId, targetId,
			''
		);
		
		let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
			targetId, ApiTargetsAndSources.serviceSource,
			FirmwareDeviceRouter._deviceId, FirmwareDeviceRouter._deviceName,
			commandId, commandName,
			null
		);
		
		apiCommandMessage.generateMessageRawBytes();
		this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
			// No outputs...
			
			this.logResponse(request.path, request.method,
				FirmwareDeviceRouter._deviceId, FirmwareDeviceRouter._deviceName,
				commandId, commandName,
				sourceId, targetId,
				''
			);
			
			response.sendStatus(200);
		}).catch(reason => {
			let errorCode: number = 400;
			let errorDetail: string = `Error in jumpToBootloader while sending API Command: ${reason}`;
			
			this.routeError(request.path, request.method, errorCode, errorDetail);
			
			response.status(errorCode).json({'error': errorDetail});
		});
	}
}
