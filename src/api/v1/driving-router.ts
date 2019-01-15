// external imports
import {Request, Response, NextFunction} from 'express';

// internal imports
import {DeviceRouterBase} from '../device-router-base'
import {IApiMessage} from '../../models/model-interfaces';

// TODO: this is autogen'd


export class DrivingRouter extends DeviceRouterBase {
    private static readonly _deviceId: number = 0x16;
    private static readonly _name: string = 'Driving';

    constructor() {
        super(DrivingRouter._name, DrivingRouter._deviceId);
    }

    protected initializeRoutes(): void {
        this.logRouteInfo('Initializing', 'Initializing Driving-RawMotors route');
        this.router.route('/driving/rawMotors')
            .put((request: Request, response: Response, next: NextFunction) =>
                this.rawMotors(request, response, next));
        this.registerCommand(0x00, 'Raw Motors');

        this.logRouteInfo('Initializing', 'Initializing Driving-DriveWithHeading route');
        this.router.route('/driving/driveWithHeading')
            .put((request: Request, response: Response, next: NextFunction) =>
                this.driveWithHeading(request, response, next));
        this.registerCommand(0x07, 'Drive With Heading');
    }

    public rawMotors(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x16, CID: 0x00, Targets: 0x12
        // Inputs: Left Mode (uint8), Left Speed (uint8), Right Mode (uint8), Right Speed (uint8)
        // Outputs: None

        let commandId = 0x00;
        let commandName = this.getCommandName(commandId);

        let target: number = 0x12;

        let jsonBody: string = JSON.stringify(request.body);
        this.logRouteInfo('JSON Body', jsonBody);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': target,
            'data': null
        };

        response.status(200).json(responseJson);
    }

    public driveWithHeading(request: Request, response: Response, next: NextFunction): void {
        // DID: 0x16, CID: 0x07, Targets: 0x12
        // Inputs: Speed (uint8), Heading (uint16), Flags (uint8)
        // Outputs: None

        let commandId = 0x07;
        let commandName = this.getCommandName(commandId);

        let target: number = 0x12;

        let jsonBody: string = JSON.stringify(request.body);
        this.logRouteInfo('JSON Body', jsonBody);

        let responseJson = {
            'deviceId': this.deviceId,
            'commandId': commandId,
            'name': commandName,
            'source': target,
            'data': null
        };

        response.status(200).json(responseJson);
    }
}
