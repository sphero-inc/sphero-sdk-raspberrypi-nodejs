// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x16
// Device Name:             drive
// Device Description:      
// Command Count:           9
// Source File:             0x16-driving.json
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
    parseRawMotorsRequest
} from './command-parsers/0x16-drive/0x01-raw-motors-command-parser'
import {
    parseDriveWithHeadingRequest
} from './command-parsers/0x16-drive/0x07-drive-with-heading-command-parser'
import {
    parseSetStabilizationRequest
} from './command-parsers/0x16-drive/0x0C-set-stabilization-command-parser'
import {
    parseEnableMotorStallNotifyRequest
} from './command-parsers/0x16-drive/0x25-enable-motor-stall-notify-command-parser'
import {
    parseEnableMotorFaultNotifyRequest
} from './command-parsers/0x16-drive/0x27-enable-motor-fault-notify-command-parser'
import {
    parseGetMotorFaultStateResponse,
    IGetMotorFaultStateResponse
} from './command-parsers/0x16-drive/0x29-get-motor-fault-state-command-parser'


export class DriveDeviceRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x16;
    private static readonly _deviceName: string = 'Drive (0x16)';
    
    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(DriveDeviceRouter._deviceName, apiDal, configuration, DriveDeviceRouter._deviceId);
    }
    
    protected initializeRoutes(): void {
        this.router.route('/drive/rawMotors/:targetId')
            .put((request: Request, response: Response) =>
                this.rawMotors(request, response));
        this.registerCommand(0x01, 'RawMotors');
        
        this.router.route('/drive/resetYaw/:targetId')
            .put((request: Request, response: Response) =>
                this.resetYaw(request, response));
        this.registerCommand(0x06, 'ResetYaw');
        
        this.router.route('/drive/driveWithHeading/:targetId')
            .put((request: Request, response: Response) =>
                this.driveWithHeading(request, response));
        this.registerCommand(0x07, 'DriveWithHeading');
        
        this.router.route('/drive/setStabilization/:targetId')
            .put((request: Request, response: Response) =>
                this.setStabilization(request, response));
        this.registerCommand(0x0C, 'SetStabilization');
        
        this.router.route('/drive/enableMotorStallNotify/:targetId')
            .put((request: Request, response: Response) =>
                this.enableMotorStallNotify(request, response));
        this.registerCommand(0x25, 'EnableMotorStallNotify');
        
        this.router.route('/drive/enableMotorFaultNotify/:targetId')
            .put((request: Request, response: Response) =>
                this.enableMotorFaultNotify(request, response));
        this.registerCommand(0x27, 'EnableMotorFaultNotify');
        
        this.router.route('/drive/getMotorFaultState/:targetId')
            .get((request: Request, response: Response) =>
                this.getMotorFaultState(request, response));
        this.registerCommand(0x29, 'GetMotorFaultState');
    }
    
    public rawMotors(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x01 | TID(s): 2
        
        let commandId: number = 0x01;
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
        
        let dataRawBytes: Array<number> = parseRawMotorsRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in rawMotors while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public resetYaw(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x06 | TID(s): 2
        
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
            DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in resetYaw while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public driveWithHeading(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x07 | TID(s): 2
        
        let commandId: number = 0x07;
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
        
        let dataRawBytes: Array<number> = parseDriveWithHeadingRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in driveWithHeading while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public setStabilization(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x0C | TID(s): 2
        
        let commandId: number = 0x0C;
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
        
        let dataRawBytes: Array<number> = parseSetStabilizationRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in setStabilization while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public enableMotorStallNotify(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x25 | TID(s): 2
        
        let commandId: number = 0x25;
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
        
        let dataRawBytes: Array<number> = parseEnableMotorStallNotifyRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in enableMotorStallNotify while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public enableMotorFaultNotify(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x27 | TID(s): 2
        
        let commandId: number = 0x27;
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
        
        let dataRawBytes: Array<number> = parseEnableMotorFaultNotifyRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in enableMotorFaultNotify while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public getMotorFaultState(request: Request, response: Response) {
        // DID: 0x16 | CID: 0x29 | TID(s): 2
        
        let commandId: number = 0x29;
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
            let responsePayload: IGetMotorFaultStateResponse = parseGetMotorFaultStateResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                DriveDeviceRouter._deviceId, DriveDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getMotorFaultState while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
}
