// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from './router-base';
import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../models/api-command-message';
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {ApiTargetsAndSources} from '../constants';
import {parseSetAllLedsWith32BitMaskRequest} from './v1.0/command-parsers/0x1A-io/0x1A-set-all-leds-with-32-bit-mask-command-parser';


export class LedControlRouter extends RouterBase {
    private static readonly _routerName: string = 'LedControl';

    private static readonly _targetId: number = 0x02;

    private static readonly _deviceId: number = 0x16;
    private static readonly _deviceName: string = 'Drive (0x16)';

    private static readonly _resetYawcommandId: number = 0x06;
    private static readonly _resetYawcommandName: number = "Reset yaw";

    private static readonly _rawMotorsCommandId: number = 0x01;
    private static readonly _rawMotorsCommandName: number = "Raw motors";

    private static readonly _driveWithHeadingCommandId: number = 0x07;
    private static readonly _driveWithHeadingCommandName: number = "Drive with heading";

    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(LedControlRouter._routerName, apiDal, configuration);
    }

    protected initializeRoutes(): void {
        this.router.route('/resetHeading')
            .put((request: Request, response: Response) => this.resetHeading(request, response));

        this.router.route('/driveBackwardSeconds')
            .put((request: Request, response: Response) => this.driveBackwardSeconds(request, response));

        this.router.route('/driveForwardSeconds')
            .put((request: Request, response: Response) => this.driveForwardSeconds(request, response));

        this.router.route('/turnLeftDegrees')
            .put((request: Request, response: Response) => this.turnLeftDegrees(request, response));

        this.router.route('/turnRightDegrees')
            .put((request: Request, response: Response) => this.turnRightDegrees(request, response));

        this.router.route('/rollStart')
            .put((request: Request, response: Response) => this.rollStart(request, response));

        this.router.route('/rollStop')
            .put((request: Request, response: Response) => this.rollStop(request, response));

        this.router.route('/aimStart')
            .put((request: Request, response: Response) => this.aimStart(request, response));

        this.router.route('/aimStop')
            .put((request: Request, response: Response) => this.aimStop(request, response));
    }

    public resetHeading(request: Request, response: Response) {
        try {
            this._resetHeading();
        } catch(e) {
            response.status(errorCode).json({'error': e});
        }
    }

    public driveBackwardSeconds(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        try {
            this._timedDrive(request.body.speed, request.body.heading, 1, request.seconds);

        } catch(e) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in driveWithHeading while sending API Command: ${e}`;

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public driveForwardSeconds(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        try {
            this._timedDrive(request.body.speed, request.body.heading, 0, request.seconds);

        } catch(e) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in driveWithHeading while sending API Command: ${e}`;

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public turnLeftDegrees(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        try {
            this._driveWithHeading(0, (heading - amount) % 360, 0)
        } catch (e) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in driveWithHeading while sending API Command: ${e}`;

            response.status(errorCode).json({'error': e});
        }
    }

    public turnRightDegrees(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        try {
            this._driveWithHeading(0, (heading + amount) % 360, 0)
        } catch (e) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in driveWithHeading while sending API Command: ${e}`;

            response.status(errorCode).json({'error': e});
        }
    }

    public rollStart(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});
            return;
        }

        let flags: number = 0;

        if (request.body.speed < 0)
            flags = flags | DriveControlObserver.__drive_reverse_flag

        let speed = Math.abs(request.body.speed);
        if (speed > 255)
            speed = 255

        let heading: number = request.body.heading;
        while(heading < 0)
            heading += 360

        heading = heading % 360

        try {
            this._driveWithHeading(speed, heading, flags);
        } catch(e){
            let errorCode: number = 400;
            let errorDetail: string = `Error in driveWithHeading while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public rollStop(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        // TODO
    }

    public aimStart(request: Request, response: Response) {
        // TODO
    }

    public aimStop(request: Request, response: Response) {

        this._resetHeading();

        // TODO

    }

    private _timedDrive(speed: number, heading: number, flags: number, seconds: number){
        try {
            this._driveWithHeading(speed, heading, flags);

            setTimeout(() => {
                this._driveWithHeading(0, heading, flags);
            }, seconds * 1000);
        } catch(e) {
            throw new Error(e);
        }
    }

    private _driveWithHeading(speed: number, heading: number, flags: number) {
        let dataRawBytes: Array<number> = parseDriveWithHeadingRequest({'speed': speed, 'heading': heading, 'flags': flags});

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            LedControlRouter._targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._driveWithHeadingCommandId, LedControlRouter._driveWithHeadingCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {

        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in driveWithHeading while sending API Command: ${reason}`;

            throw new Error(errorDetail)
        });
    }

    private _resetHeading() {
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            LedControlRouter._targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._resetYawcommandId, LedControlRouter._resetYawcommandName,
            null
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");

        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetYaw while sending API Command: ${reason}`;

            throw new Error(errorDetail);
        });
    }
}


