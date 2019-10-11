// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x1A
// Device Name:             io
// Device Description:      
// Command Count:           7
// Source File:             0x1A-user_io.json
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
    parseSetAllLedsRequest
} from './command-parsers/0x1A-io/0x1A-set-all-leds-command-parser'
import {
    parseGetActiveColorPaletteResponse,
    IGetActiveColorPaletteResponse
} from './command-parsers/0x1A-io/0x44-get-active-color-palette-command-parser'
import {
    parseSetActiveColorPaletteRequest
} from './command-parsers/0x1A-io/0x45-set-active-color-palette-command-parser'
import {
    parseGetColorIdentificationReportRequest,
    parseGetColorIdentificationReportResponse,
    IGetColorIdentificationReportResponse
} from './command-parsers/0x1A-io/0x46-get-color-identification-report-command-parser'
import {
    parseLoadColorPaletteRequest
} from './command-parsers/0x1A-io/0x47-load-color-palette-command-parser'
import {
    parseSaveColorPaletteRequest
} from './command-parsers/0x1A-io/0x48-save-color-palette-command-parser'


export class IoDeviceRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x1A;
    private static readonly _deviceName: string = 'Io (0x1A)';
    
    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(IoDeviceRouter._deviceName, apiDal, configuration, IoDeviceRouter._deviceId);
    }
    
    protected initializeRoutes(): void {
        this.router.route('/io/setAllLeds/:targetId')
            .put((request: Request, response: Response) =>
                this.setAllLeds(request, response));
        this.registerCommand(0x1A, 'SetAllLeds');
        
        this.router.route('/io/getActiveColorPalette/:targetId')
            .get((request: Request, response: Response) =>
                this.getActiveColorPalette(request, response));
        this.registerCommand(0x44, 'GetActiveColorPalette');
        
        this.router.route('/io/setActiveColorPalette/:targetId')
            .put((request: Request, response: Response) =>
                this.setActiveColorPalette(request, response));
        this.registerCommand(0x45, 'SetActiveColorPalette');
        
        this.router.route('/io/getColorIdentificationReport/:targetId')
            .put((request: Request, response: Response) =>
                this.getColorIdentificationReport(request, response));
        this.registerCommand(0x46, 'GetColorIdentificationReport');
        
        this.router.route('/io/loadColorPalette/:targetId')
            .put((request: Request, response: Response) =>
                this.loadColorPalette(request, response));
        this.registerCommand(0x47, 'LoadColorPalette');
        
        this.router.route('/io/saveColorPalette/:targetId')
            .put((request: Request, response: Response) =>
                this.saveColorPalette(request, response));
        this.registerCommand(0x48, 'SaveColorPalette');
        
        this.router.route('/io/releaseLedRequests/:targetId')
            .put((request: Request, response: Response) =>
                this.releaseLedRequests(request, response));
        this.registerCommand(0x4E, 'ReleaseLedRequests');
    }
    
    public setAllLeds(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x1A | TID(s): 1
        
        let commandId: number = 0x1A;
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
        
        let dataRawBytes: Array<number> = parseSetAllLedsRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in setAllLeds while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public getActiveColorPalette(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x44 | TID(s): 1
        
        let commandId: number = 0x44;
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
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            null
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetActiveColorPaletteResponse = parseGetActiveColorPaletteResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getActiveColorPalette while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public setActiveColorPalette(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x45 | TID(s): 1
        
        let commandId: number = 0x45;
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
        
        let dataRawBytes: Array<number> = parseSetActiveColorPaletteRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in setActiveColorPalette while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public getColorIdentificationReport(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x46 | TID(s): 1
        
        let commandId: number = 0x46;
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
        
        let dataRawBytes: Array<number> = parseGetColorIdentificationReportRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            dataRawBytes
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetColorIdentificationReportResponse = parseGetColorIdentificationReportResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getColorIdentificationReport while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public loadColorPalette(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x47 | TID(s): 1
        
        let commandId: number = 0x47;
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
        
        let dataRawBytes: Array<number> = parseLoadColorPaletteRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in loadColorPalette while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public saveColorPalette(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x48 | TID(s): 1
        
        let commandId: number = 0x48;
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
        
        let dataRawBytes: Array<number> = parseSaveColorPaletteRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in saveColorPalette while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public releaseLedRequests(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x4E | TID(s): 1
        
        let commandId: number = 0x4E;
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
            IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in releaseLedRequests while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
}
