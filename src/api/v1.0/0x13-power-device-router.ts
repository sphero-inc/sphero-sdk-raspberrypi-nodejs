// ************************************************************
// This file was automatically generated!
// Device ID (DID):         0x13
// Device Name:             power
// Device Description:      
// Command Count:           11
// Source File:             0x13-power.json
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
    parseGetBatteryPercentageResponse,
    IGetBatteryPercentageResponse
} from './command-parsers/0x13-power/0x10-get-battery-percentage-command-parser'
import {
    parseGetBatteryVoltageStateResponse,
    IGetBatteryVoltageStateResponse
} from './command-parsers/0x13-power/0x17-get-battery-voltage-state-command-parser'
import {
    parseEnableBatteryVoltageStateChangeNotifyRequest
} from './command-parsers/0x13-power/0x1B-enable-battery-voltage-state-change-notify-command-parser'
import {
    parseGetBatteryVoltageInVoltsRequest,
    parseGetBatteryVoltageInVoltsResponse,
    IGetBatteryVoltageInVoltsResponse
} from './command-parsers/0x13-power/0x25-get-battery-voltage-in-volts-command-parser'
import {
    parseGetBatteryVoltageStateThresholdsResponse,
    IGetBatteryVoltageStateThresholdsResponse
} from './command-parsers/0x13-power/0x26-get-battery-voltage-state-thresholds-command-parser'
import {
    parseGetCurrentSenseAmplifierCurrentRequest,
    parseGetCurrentSenseAmplifierCurrentResponse,
    IGetCurrentSenseAmplifierCurrentResponse
} from './command-parsers/0x13-power/0x27-get-current-sense-amplifier-current-command-parser'


export class PowerDeviceRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x13;
    private static readonly _deviceName: string = 'Power (0x13)';
    
    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(PowerDeviceRouter._deviceName, apiDal, configuration, PowerDeviceRouter._deviceId);
    }
    
    protected initializeRoutes(): void {
        this.router.route('/power/sleep/:targetId')
            .put((request: Request, response: Response) =>
                this.sleep(request, response));
        this.registerCommand(0x01, 'Sleep');
        
        this.router.route('/power/wake/:targetId')
            .put((request: Request, response: Response) =>
                this.wake(request, response));
        this.registerCommand(0x0D, 'Wake');
        
        this.router.route('/power/getBatteryPercentage/:targetId')
            .get((request: Request, response: Response) =>
                this.getBatteryPercentage(request, response));
        this.registerCommand(0x10, 'GetBatteryPercentage');
        
        this.router.route('/power/getBatteryVoltageState/:targetId')
            .get((request: Request, response: Response) =>
                this.getBatteryVoltageState(request, response));
        this.registerCommand(0x17, 'GetBatteryVoltageState');
        
        this.router.route('/power/enableBatteryVoltageStateChangeNotify/:targetId')
            .put((request: Request, response: Response) =>
                this.enableBatteryVoltageStateChangeNotify(request, response));
        this.registerCommand(0x1B, 'EnableBatteryVoltageStateChangeNotify');
        
        this.router.route('/power/getBatteryVoltageInVolts/:targetId')
            .put((request: Request, response: Response) =>
                this.getBatteryVoltageInVolts(request, response));
        this.registerCommand(0x25, 'GetBatteryVoltageInVolts');
        
        this.router.route('/power/getBatteryVoltageStateThresholds/:targetId')
            .get((request: Request, response: Response) =>
                this.getBatteryVoltageStateThresholds(request, response));
        this.registerCommand(0x26, 'GetBatteryVoltageStateThresholds');
        
        this.router.route('/power/getCurrentSenseAmplifierCurrent/:targetId')
            .put((request: Request, response: Response) =>
                this.getCurrentSenseAmplifierCurrent(request, response));
        this.registerCommand(0x27, 'GetCurrentSenseAmplifierCurrent');
    }
    
    public sleep(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x01 | TID(s): 1
        
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
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in sleep while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public wake(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x0D | TID(s): 1
        
        let commandId: number = 0x0D;
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
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in wake while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                null
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public getBatteryPercentage(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x10 | TID(s): 1
        
        let commandId: number = 0x10;
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
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            null
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetBatteryPercentageResponse = parseGetBatteryPercentageResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getBatteryPercentage while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public getBatteryVoltageState(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x17 | TID(s): 1
        
        let commandId: number = 0x17;
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
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            null
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetBatteryVoltageStateResponse = parseGetBatteryVoltageStateResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getBatteryVoltageState while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public enableBatteryVoltageStateChangeNotify(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x1B | TID(s): 1
        
        let commandId: number = 0x1B;
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
        
        let dataRawBytes: Array<number> = parseEnableBatteryVoltageStateChangeNotifyRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let isResponseRequested: boolean = request.body.isResponseRequested != undefined ? request.body.isResponseRequested : true;
        if (isResponseRequested) {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
                // No outputs...
                
                this.logResponse(request.path, request.method,
                    PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                    commandId, commandName,
                    sourceId, targetId,
                    ''
                );
                
                response.sendStatus(200);
            }).catch(reason => {
                let errorCode: number = 400;
                let errorDetail: string = `Error in enableBatteryVoltageStateChangeNotify while sending API Command: ${reason}`;
                
                this.routeError(request.path, request.method, errorCode, errorDetail);
                
                response.status(errorCode).json({'error': errorDetail});
            });
        } else {
            let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithNoResponseDefaultFlags(
                targetId, ApiTargetsAndSources.serviceSource,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                dataRawBytes
            );
            
            apiCommandMessage.generateMessageRawBytes();
            this._apiDal.sendApiCommandMessage(apiCommandMessage);
            response.sendStatus(200);
        }
        
    }
    
    public getBatteryVoltageInVolts(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x25 | TID(s): 1
        
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
        
        let dataRawBytes: Array<number> = parseGetBatteryVoltageInVoltsRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            dataRawBytes
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetBatteryVoltageInVoltsResponse = parseGetBatteryVoltageInVoltsResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getBatteryVoltageInVolts while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public getBatteryVoltageStateThresholds(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x26 | TID(s): 1
        
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
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            ''
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            null
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetBatteryVoltageStateThresholdsResponse = parseGetBatteryVoltageStateThresholdsResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getBatteryVoltageStateThresholds while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
    
    public getCurrentSenseAmplifierCurrent(request: Request, response: Response) {
        // DID: 0x13 | CID: 0x27 | TID(s): 1
        
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
        
        let dataRawBytes: Array<number> = parseGetCurrentSenseAmplifierCurrentRequest(request.body);
        
        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;
        
        this.logRequest(request.path, request.method,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            sourceId, targetId,
            JSON.stringify(request.body)
        );
        
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
            commandId, commandName,
            dataRawBytes
        );
        
        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            let responsePayload: IGetCurrentSenseAmplifierCurrentResponse = parseGetCurrentSenseAmplifierCurrentResponse(apiResponseMessage.dataRawBytes);
            
            this.logResponse(request.path, request.method,
                PowerDeviceRouter._deviceId, PowerDeviceRouter._deviceName,
                commandId, commandName,
                sourceId, targetId,
                JSON.stringify(responsePayload)
            );
            
            response.status(200).json(responsePayload);
        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getCurrentSenseAmplifierCurrent while sending API Command: ${reason}`;
            
            this.routeError(request.path, request.method, errorCode, errorDetail);
            
            response.status(errorCode).json({'error': errorDetail});
        });
    }
}
