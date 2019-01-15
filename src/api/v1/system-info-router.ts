// external imports
import {Request, Response, NextFunction} from 'express';

// internal imports
import {DeviceRouterBase} from '../device-router-base'
import {IApiMessage} from '../../models/model-interfaces';

// TODO: this is autogen'd


export class SystemInfoRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x11;
    private static readonly _name: string = 'SystemInfo';

    constructor() {
        super(SystemInfoRouter._name, SystemInfoRouter._deviceId);
    }

    protected initializeRoutes(): void {
        this.logRouteInfo('Initializing', 'Initializing SystemInfo-GetMainApplicationVersion route');
        this.router.route('/systemInfo/getMainApplicationVersion/:target')
            .get((request: Request, response: Response, next: NextFunction) =>
                this.getMainApplicationVersion(request, response, next));
        this.registerCommand(0x00, 'Get Main Application Version');

        this.logRouteInfo('Initializing', 'Initializing SystemInfo-GetBootloaderVersion route');
        this.router.route('/systemInfo/getBootloaderVersion/:target')
            .get((request: Request, response: Response, next: NextFunction) =>
                this.getBootloaderVersion(request, response, next));
        this.registerCommand(0x01, 'Get Bootloader Version');

        this.logRouteInfo('Initializing', 'Initializing SystemInfo-GetBoardRevision route');
        this.router.route('/systemInfo/getBoardRevision/:target')
            .get((request: Request, response: Response, next: NextFunction) =>
                this.getBoardReversion(request, response, next));
        this.registerCommand(0x03, 'Get Board Revision');
    }

    public getMainApplicationVersion(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x11, CID: 0x00, Targets: 0x11, 0x12
        // Inputs: None
        // Outputs: Major (uint16), Minor (uint16), Revision (uint16)

        let commandId = 0x00;
        let commandName = this.getCommandName(commandId);

        // TODO: is this what we want or should there be a default?
        if (!request.params.target) {
            response.status(400).json({'error': 'Target is required!'});
            return;
        }

        let target: number = parseInt(request.params.target);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': target,
            'data': {
                'major': 4,
                'minor': 2,
                'revision': 0
            }
        };

        response.status(200).json(responseJson);
    }

    public getBootloaderVersion(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x11, CID: 0x01, Targets: 0x11, 0x12
        // Inputs: None
        // Outputs: Major (uint16), Minor (uint16), Revision (uint16)

        let commandId = 0x01;
        let commandName = this.getCommandName(commandId);

        // TODO: is this what we want or should there be a default?
        if (!request.params.target) {
            response.status(400).json({'error': 'Target is required!'});
            return;
        }

        let target: number = parseInt(request.params.target);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': target,
            'data': {
                'major': 2,
                'minor': 1,
                'revision': 0
            }
        };

        response.status(200).json(responseJson);
    }

    public getBoardReversion(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x11, CID: 0x03, Targets: 0x11, 0x12
        // Inputs: None
        // Outputs: Board Revision (uint8)

        let commandId = 0x03;
        let commandName = this.getCommandName(commandId);

        // TODO: is this what we want or should there be a default?
        if (!request.params.target) {
            response.status(400).json({'error': 'Target is required!'});
            return;
        }

        let target: number = parseInt(request.params.target);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': target,
            'data': {
                'revision': 123
            }
        };

        response.status(200).json(responseJson);
    }
}
