// external imports
import {Request, Response, NextFunction} from 'express';

// internal imports
import {DeviceRouterBase} from '../device-router-base'
import {IApiMessage} from '../../models/api-message';
import {IConfiguration} from '../../configuration';

// TODO: this is autogen'd


export class DriveRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x16;
    private static readonly _name: string = 'Drive (0x16)';

    constructor(configuration: IConfiguration) {
        super(DriveRouter._name, configuration, DriveRouter._deviceId);
    }

    protected initializeRoutes(): void {
        // TODO: should we NOT send targetId??

        this.router.route('/drive/rawMotors/:targetId')
            .put((request: Request, response: Response, next: NextFunction) =>
                this.rawMotors(request, response, next));
        this.registerCommand(0x00, 'Raw Motors');

        this.router.route('/drive/driveWithHeading/:targetId')
            .put((request: Request, response: Response, next: NextFunction) =>
                this.driveWithHeading(request, response, next));
        this.registerCommand(0x07, 'Drive With Heading');
    }

    public rawMotors(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x16, CID: 0x00, TIDs: 0x12
        // Inputs: Left Mode (uint8), Left Speed (uint8), Right Mode (uint8), Right Speed (uint8)
        // Outputs: None

        let commandId = 0x00;
        let commandName = this.getCommandName(commandId);

        if (!request.params.toyPrefix) {
            response.status(400).json({'error': 'toyPrefix is required!'});
            return;
        }

        let toyPrefix: string = request.params.toyPrefix;
        // TODO: add check if toyPrefix is supported

        // ignoring targetId in url
        let targetId: number = 0x12;

        let jsonBody: string = JSON.stringify(request.body);
        this.logRouteInfo('JSON Body', jsonBody);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': targetId,
            'data': null
        };

        response.status(200).json(responseJson.data);
    }

    public driveWithHeading(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x16, CID: 0x07, TIDs: 0x12
        // Inputs: Speed (uint8), Heading (uint16), Flags (uint8)
        // Outputs: None

        let commandId = 0x07;
        let commandName = this.getCommandName(commandId);

        if (!request.params.toyPrefix) {
            response.status(400).json({'error': 'toyPrefix is required!'});
            return;
        }

        let toyPrefix: string = request.params.toyPrefix;
        // TODO: add check if toyPrefix is supported

        // ignoring targetId in url
        let targetId: number = 0x12;

        let jsonBody: string = JSON.stringify(request.body);
        this.logRouteInfo('JSON Body', jsonBody);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': targetId,
            'data': null
        };

        response.status(200).json(responseJson.data);
    }
}
