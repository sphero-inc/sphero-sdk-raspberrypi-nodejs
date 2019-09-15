// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x1A
// Device Name:             io
// Device Description:      
// Command Count:           22
// Source File:             0x1A-user_io.json
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
    parseSetAllLedsRequest
} from './command-parsers/0x1A-io/0x1A-set-all-leds-command-parser'
import {
    parseSetCompressedFramePlayerOneColorRequest
} from './command-parsers/0x1A-io/0x2F-set-compressed-frame-player-one-color-command-parser'
import {
    parseSaveCompressedFramePlayerAnimationRequest
} from './command-parsers/0x1A-io/0x31-save-compressed-frame-player-animation-command-parser'
import {
    parsePlayCompressedFramePlayerAnimationRequest
} from './command-parsers/0x1A-io/0x32-play-compressed-frame-player-animation-command-parser'
import {
    parsePlayCompressedFramePlayerFrameRequest
} from './command-parsers/0x1A-io/0x33-play-compressed-frame-player-frame-command-parser'
import {
    parseGetCompressedFramePlayerListOfFramesResponse,
    IGetCompressedFramePlayerListOfFramesResponse
} from './command-parsers/0x1A-io/0x34-get-compressed-frame-player-list-of-frames-command-parser'
import {
    parseAssignCompressedFramePlayerFramesToAnimationRequest
} from './command-parsers/0x1A-io/0x40-assign-compressed-frame-player-frames-to-animation-command-parser'
import {
    parseSaveCompressedFramePlayerAnimationWithoutFramesRequest,
    parseSaveCompressedFramePlayerAnimationWithoutFramesResponse,
    ISaveCompressedFramePlayerAnimationWithoutFramesResponse
} from './command-parsers/0x1A-io/0x41-save-compressed-frame-player-animation-without-frames-command-parser'
import {
    parsePlayCompressedFramePlayerAnimationWithLoopOptionRequest
} from './command-parsers/0x1A-io/0x43-play-compressed-frame-player-animation-with-loop-option-command-parser'
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
import {
    parseGetCompressedFramePlayerFrameInfoTypeResponse,
    IGetCompressedFramePlayerFrameInfoTypeResponse
} from './command-parsers/0x1A-io/0x4C-get-compressed-frame-player-frame-info-type-command-parser'
import {
    parseSaveCompressedFramePlayer16BitFrameRequest
} from './command-parsers/0x1A-io/0x4D-save-compressed-frame-player-16-bit-frame-command-parser'


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
        
        this.router.route('/io/setCompressedFramePlayerOneColor/:targetId')
            .put((request: Request, response: Response) =>
                this.setCompressedFramePlayerOneColor(request, response));
        this.registerCommand(0x2F, 'SetCompressedFramePlayerOneColor');
        
        this.router.route('/io/saveCompressedFramePlayerAnimation/:targetId')
            .put((request: Request, response: Response) =>
                this.saveCompressedFramePlayerAnimation(request, response));
        this.registerCommand(0x31, 'SaveCompressedFramePlayerAnimation');
        
        this.router.route('/io/playCompressedFramePlayerAnimation/:targetId')
            .put((request: Request, response: Response) =>
                this.playCompressedFramePlayerAnimation(request, response));
        this.registerCommand(0x32, 'PlayCompressedFramePlayerAnimation');
        
        this.router.route('/io/playCompressedFramePlayerFrame/:targetId')
            .put((request: Request, response: Response) =>
                this.playCompressedFramePlayerFrame(request, response));
        this.registerCommand(0x33, 'PlayCompressedFramePlayerFrame');
        
        this.router.route('/io/getCompressedFramePlayerListOfFrames/:targetId')
            .get((request: Request, response: Response) =>
                this.getCompressedFramePlayerListOfFrames(request, response));
        this.registerCommand(0x34, 'GetCompressedFramePlayerListOfFrames');
        
        this.router.route('/io/deleteAllCompressedFramePlayerAnimationsAndFrames/:targetId')
            .put((request: Request, response: Response) =>
                this.deleteAllCompressedFramePlayerAnimationsAndFrames(request, response));
        this.registerCommand(0x35, 'DeleteAllCompressedFramePlayerAnimationsAndFrames');
        
        this.router.route('/io/pauseCompressedFramePlayerAnimation/:targetId')
            .put((request: Request, response: Response) =>
                this.pauseCompressedFramePlayerAnimation(request, response));
        this.registerCommand(0x36, 'PauseCompressedFramePlayerAnimation');
        
        this.router.route('/io/resumeCompressedFramePlayerAnimation/:targetId')
            .put((request: Request, response: Response) =>
                this.resumeCompressedFramePlayerAnimation(request, response));
        this.registerCommand(0x37, 'ResumeCompressedFramePlayerAnimation');
        
        this.router.route('/io/resetCompressedFramePlayerAnimation/:targetId')
            .put((request: Request, response: Response) =>
                this.resetCompressedFramePlayerAnimation(request, response));
        this.registerCommand(0x38, 'ResetCompressedFramePlayerAnimation');
        
        this.router.route('/io/assignCompressedFramePlayerFramesToAnimation/:targetId')
            .put((request: Request, response: Response) =>
                this.assignCompressedFramePlayerFramesToAnimation(request, response));
        this.registerCommand(0x40, 'AssignCompressedFramePlayerFramesToAnimation');
        
        this.router.route('/io/saveCompressedFramePlayerAnimationWithoutFrames/:targetId')
            .get((request: Request, response: Response) =>
                this.saveCompressedFramePlayerAnimationWithoutFrames(request, response));
        this.registerCommand(0x41, 'SaveCompressedFramePlayerAnimationWithoutFrames');
        
        this.router.route('/io/playCompressedFramePlayerAnimationWithLoopOption/:targetId')
            .put((request: Request, response: Response) =>
                this.playCompressedFramePlayerAnimationWithLoopOption(request, response));
        this.registerCommand(0x43, 'PlayCompressedFramePlayerAnimationWithLoopOption');
        
        this.router.route('/io/getActiveColorPalette/:targetId')
            .get((request: Request, response: Response) =>
                this.getActiveColorPalette(request, response));
        this.registerCommand(0x44, 'GetActiveColorPalette');
        
        this.router.route('/io/setActiveColorPalette/:targetId')
            .put((request: Request, response: Response) =>
                this.setActiveColorPalette(request, response));
        this.registerCommand(0x45, 'SetActiveColorPalette');
        
        this.router.route('/io/getColorIdentificationReport/:targetId')
            .get((request: Request, response: Response) =>
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
        
        this.router.route('/io/getCompressedFramePlayerFrameInfoType/:targetId')
            .get((request: Request, response: Response) =>
                this.getCompressedFramePlayerFrameInfoType(request, response));
        this.registerCommand(0x4C, 'GetCompressedFramePlayerFrameInfoType');
        
        this.router.route('/io/saveCompressedFramePlayer16BitFrame/:targetId')
            .put((request: Request, response: Response) =>
                this.saveCompressedFramePlayer16BitFrame(request, response));
        this.registerCommand(0x4D, 'SaveCompressedFramePlayer16BitFrame');
        
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
    }
    
    public setCompressedFramePlayerOneColor(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x2F | TID(s): 1
        
        let commandId: number = 0x2F;
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
        
        let dataRawBytes: Array<number> = parseSetCompressedFramePlayerOneColorRequest(request.body);
        
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
            let errorDetail: string = `Error in setCompressedFramePlayerOneColor while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public saveCompressedFramePlayerAnimation(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x31 | TID(s): 1
        
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
        
        let dataRawBytes: Array<number> = parseSaveCompressedFramePlayerAnimationRequest(request.body);
        
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
            let errorDetail: string = `Error in saveCompressedFramePlayerAnimation while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public playCompressedFramePlayerAnimation(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x32 | TID(s): 1
        
        let commandId: number = 0x32;
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
        
        let dataRawBytes: Array<number> = parsePlayCompressedFramePlayerAnimationRequest(request.body);
        
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
            let errorDetail: string = `Error in playCompressedFramePlayerAnimation while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public playCompressedFramePlayerFrame(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x33 | TID(s): 1
        
        let commandId: number = 0x33;
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
        
        let dataRawBytes: Array<number> = parsePlayCompressedFramePlayerFrameRequest(request.body);
        
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
            let errorDetail: string = `Error in playCompressedFramePlayerFrame while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public getCompressedFramePlayerListOfFrames(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x34 | TID(s): 1
        
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
            let responsePayload: IGetCompressedFramePlayerListOfFramesResponse = parseGetCompressedFramePlayerListOfFramesResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getCompressedFramePlayerListOfFrames while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public deleteAllCompressedFramePlayerAnimationsAndFrames(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x35 | TID(s): 1
        
        let commandId: number = 0x35;
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
            let errorDetail: string = `Error in deleteAllCompressedFramePlayerAnimationsAndFrames while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public pauseCompressedFramePlayerAnimation(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x36 | TID(s): 1
        
        let commandId: number = 0x36;
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
            let errorDetail: string = `Error in pauseCompressedFramePlayerAnimation while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public resumeCompressedFramePlayerAnimation(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x37 | TID(s): 1
        
        let commandId: number = 0x37;
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
            let errorDetail: string = `Error in resumeCompressedFramePlayerAnimation while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public resetCompressedFramePlayerAnimation(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x38 | TID(s): 1
        
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
            let errorDetail: string = `Error in resetCompressedFramePlayerAnimation while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public assignCompressedFramePlayerFramesToAnimation(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x40 | TID(s): 1
        
        let commandId: number = 0x40;
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
        
        let dataRawBytes: Array<number> = parseAssignCompressedFramePlayerFramesToAnimationRequest(request.body);
        
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
            let errorDetail: string = `Error in assignCompressedFramePlayerFramesToAnimation while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public saveCompressedFramePlayerAnimationWithoutFrames(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x41 | TID(s): 1
        
        let commandId: number = 0x41;
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
        
        let dataRawBytes: Array<number> = parseSaveCompressedFramePlayerAnimationWithoutFramesRequest(request.body);
        
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
            let responsePayload: ISaveCompressedFramePlayerAnimationWithoutFramesResponse = parseSaveCompressedFramePlayerAnimationWithoutFramesResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in saveCompressedFramePlayerAnimationWithoutFrames while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public playCompressedFramePlayerAnimationWithLoopOption(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x43 | TID(s): 1
        
        let commandId: number = 0x43;
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
        
        let dataRawBytes: Array<number> = parsePlayCompressedFramePlayerAnimationWithLoopOptionRequest(request.body);
        
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
            let errorDetail: string = `Error in playCompressedFramePlayerAnimationWithLoopOption while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
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
    }
    
    public getCompressedFramePlayerFrameInfoType(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x4C | TID(s): 1
        
        let commandId: number = 0x4C;
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
            let responsePayload: IGetCompressedFramePlayerFrameInfoTypeResponse = parseGetCompressedFramePlayerFrameInfoTypeResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                IoDeviceRouter._deviceId, IoDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getCompressedFramePlayerFrameInfoType while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public saveCompressedFramePlayer16BitFrame(request: Request, response: Response) {
        // DID: 0x1A | CID: 0x4D | TID(s): 1
        
        let commandId: number = 0x4D;
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
        
        let dataRawBytes: Array<number> = parseSaveCompressedFramePlayer16BitFrameRequest(request.body);
        
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
            let errorDetail: string = `Error in saveCompressedFramePlayer16BitFrame while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
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
    }
}
