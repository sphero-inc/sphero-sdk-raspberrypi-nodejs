// external imports
import {Request, Response, NextFunction} from 'express';

// internal imports
import {DeviceRouterBase} from '../device-router-base'
import {IApiMessage} from '../../models/api-message';
import {IConfiguration} from '../../configuration';

// TODO: this is autogen'd


export class SystemInfoRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x11;
    private static readonly _name: string = 'System Info (0x11)';

    constructor(configuration: IConfiguration) {
        super(SystemInfoRouter._name, configuration, SystemInfoRouter._deviceId);
    }

    protected initializeRoutes(): void {
        this.router.route('/systemInfo/getMainApplicationVersion/:targetId')
            .get((request: Request, response: Response, next: NextFunction) =>
                this.getMainApplicationVersion(request, response, next));
        this.registerCommand(0x00, 'Get Main Application Version');

        this.router.route('/systemInfo/getBootloaderVersion/:targetId')
            .get((request: Request, response: Response, next: NextFunction) =>
                this.getBootloaderVersion(request, response, next));
        this.registerCommand(0x01, 'Get Bootloader Version');

        this.router.route('/systemInfo/getBoardRevision/:targetId')
            .get((request: Request, response: Response, next: NextFunction) =>
                this.getBoardReversion(request, response, next));
        this.registerCommand(0x03, 'Get Board Revision');
    }

    public getMainApplicationVersion(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x11, CID: 0x00, TIDs: 0x11, 0x12
        // Inputs: None
        // Outputs: Major (uint16), Minor (uint16), Revision (uint16)

        let commandId: number = 0x00;
        let commandName: string | null = this.getCommandName(commandId);
        if (!commandName) {
            commandName = 'Unknown';
        }

        if (!request.params.toyPrefix) {
            response.status(400).json({'error': 'toyPrefix is required!'});
            return;
        }

        let toyPrefix: string = request.params.toyPrefix;
        // TODO: add check if toyPrefix is supported

        // TODO: is this what we want or should there be a default?
        if (!request.params.targetId) {
            response.status(400).json({'error': 'targetId is required!'});
            return;
        }

        let targetId: number = parseInt(request.params.targetId);

        this.routeExecuted(request.path, request.method, toyPrefix, SystemInfoRouter._deviceId, commandId, targetId, commandName);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': targetId,
            'data': {
                'major': 4,
                'minor': 2,
                'revision': 0
            }
        };

        response.status(200).json(responseJson.data);
    }

    public getBootloaderVersion(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x11, CID: 0x01, TIDs: 0x11, 0x12
        // Inputs: None
        // Outputs: Major (uint16), Minor (uint16), Revision (uint16)

        let commandId = 0x01;
        let commandName = this.getCommandName(commandId);

        if (!request.params.toyPrefix) {
            response.status(400).json({'error': 'toyPrefix is required!'});
            return;
        }

        let toyPrefix: string = request.params.toyPrefix;
        // TODO: add check if toyPrefix is supported

        // TODO: is this what we want or should there be a default?
        if (!request.params.targetId) {
            response.status(400).json({'error': 'targetId is required!'});
            return;
        }

        let targetId: number = parseInt(request.params.targetId);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': targetId,
            'data': {
                'major': 2,
                'minor': 1,
                'revision': 0
            }
        };

        response.status(200).json(responseJson.data);
    }

    public getBoardReversion(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x11, CID: 0x03, TIDs: 0x11, 0x12
        // Inputs: None
        // Outputs: Board Revision (uint8)

        let commandId = 0x03;
        let commandName = this.getCommandName(commandId);

        if (!request.params.toyPrefix) {
            response.status(400).json({'error': 'toyPrefix is required!'});
            return;
        }

        let toyPrefix: string = request.params.toyPrefix;
        // TODO: add check if toyPrefix is supported

        // TODO: is this what we want or should there be a default?
        if (!request.params.targetId) {
            response.status(400).json({'error': 'targetId is required!'});
            return;
        }

        let targetId: number = parseInt(request.params.targetId);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': targetId,
            'data': {
                'revision': 123
            }
        };

        response.status(200).json(responseJson.data);
    }
}
