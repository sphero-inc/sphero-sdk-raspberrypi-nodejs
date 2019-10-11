// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x19
// Device Name:             connection
// Device Description:      
// Command Count:           1
// Source File:             0x19-peer_connection.json
// ************************************************************

// external imports
import {Request, Response} from 'express';

// internal imports
import {DeviceRouterBase} from '../device-router-base';
import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags, buildApiCommandMessageWithNoResponseDefaultFlags} from '../../models/api-command-message';
import {IApiResponseMessage} from '../../models/api-response-message';
import {IConfiguration} from '../../configuration';
import {IApiDal} from '../../modules/api-dal-interface';
import {ByteConversionUtilities} from '../../utilities/byte-conversion-utilities'
import {ApiTargetsAndSources} from '../../constants';

// command parsers
import {
    parseGetBluetoothAdvertisingNameResponse,
    IGetBluetoothAdvertisingNameResponse
} from './command-parsers/0x19-connection/0x05-get-bluetooth-advertising-name-command-parser'


export class ConnectionDeviceRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x19;
    private static readonly _deviceName: string = 'Connection (0x19)';
    
    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(ConnectionDeviceRouter._deviceName, apiDal, configuration, ConnectionDeviceRouter._deviceId);
    }
    
    protected initializeRoutes(): void {
        this.router.route('/connection/getBluetoothAdvertisingName/:targetId')
            .get((request: Request, response: Response) =>
                this.getBluetoothAdvertisingName(request, response));
        this.registerCommand(0x05, 'GetBluetoothAdvertisingName');
    }
    
    public getBluetoothAdvertisingName(request: Request, response: Response) {
        // DID: 0x19 | CID: 0x05 | TID(s): 1
        
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
            let responsePayload: IGetBluetoothAdvertisingNameResponse = parseGetBluetoothAdvertisingNameResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                ConnectionDeviceRouter._deviceId, ConnectionDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getBluetoothAdvertisingName while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
}
