import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../../../models/api-command-message';
import {IApiDal} from '../../api-dal-interface';
import {ApiTargetsAndSources} from '../../../constants';
import {parseDriveWithHeadingRequest} from '../../../api/v1.0/command-parsers/0x16-drive/0x07-drive-with-heading-command-parser';
import {LedControl, LedGroups, Colors} from './led-control';
import Timer = NodeJS.Timer;
import {MathUtilities} from "../../../utilities/math-utilities";

export class DriveControl {
    private static readonly _targetId: number = 0x02;

    private static readonly _deviceId: number = 0x16;
    private static readonly _deviceName: string = 'Drive (0x16)';

    private static readonly _resetYawCommandId: number = 0x06;
    private static readonly _resetYawCommandName: string = 'Reset yaw';

    private static readonly _rawMotorsCommandId: number = 0x01;
    private static readonly _rawMotorsCommandName: string = 'Raw motors';

    private static readonly _driveWithHeadingCommandId: number = 0x07;
    private static readonly _driveWithHeadingCommandName: string = 'Drive with heading';

    private static readonly _driveNoFlag = 0x00;
    private static readonly _driveReverseFlag = 0x01;

    private readonly _apiDal: IApiDal;
    private readonly _ledController: LedControl;

    constructor(apiDal: IApiDal) {
        this._apiDal = apiDal;
        this._ledController = new LedControl(apiDal);
    }

    public resetHeading() {
        this._sendResetHeadingCommand();
    }

    public driveBackwardSeconds(speed: number, heading: number, seconds: number) {
        this._timedDrive(speed, heading, DriveControl._driveReverseFlag, seconds);
    }

    public driveForwardSeconds(speed: number, heading: number, seconds: number) {
        this._timedDrive(speed, heading, DriveControl._driveNoFlag, seconds);
    }

    public turnLeftDegrees(heading: number, amount: number) {
        this._sendDriveWithHeadingCommand(0, MathUtilities.mod(heading - amount, 360), DriveControl._driveNoFlag)
    }

    public turnRightDegrees(heading: number, amount: number) {
        this._sendDriveWithHeadingCommand(0, MathUtilities.mod(heading + amount, 360), DriveControl._driveNoFlag)
    }

    public rollStart(speed: number, heading: number) {
        this._rollDrive(speed, heading);
    }

    public rollStop(heading: number) {
        this._rollDrive(0, heading);
    }

    public aimStart() {
        this._ledController.turnLedsOff();
        this._ledController.setMultipleLedsColor(['headlight_left', 'headlight_right'], 'blue');
    }

    public aimStop() {
        this._sendResetHeadingCommand();
        this._ledController.setMultipleLedsColor(['headlight_left', 'headlight_right'], 'off');
    }

    private _timedDrive(speed: number, heading: number, flags: number, seconds: number){
        let intervalTimer: Timer = setInterval(() => {
            this._sendDriveWithHeadingCommand(speed, heading, flags);
        }, 100);

        setTimeout(() => {
            clearInterval(intervalTimer);
            this._sendDriveWithHeadingCommand(0, heading, flags);
        }, seconds * 1000);
    }

    private _rollDrive(speed: number, heading: number) {
        let flags: number = DriveControl._driveNoFlag;

        if (speed < 0)
            flags = DriveControl._driveReverseFlag;

        speed = Math.abs(speed);
        if (speed > 255)
            speed = 255;

        while (heading < 0)
            heading += 360;

        heading = heading % 360;

        this._sendDriveWithHeadingCommand(speed, heading, flags);
    }

    private _sendDriveWithHeadingCommand(speed: number, heading: number, flags: number) {
        let dataRawBytes: Array<number> = parseDriveWithHeadingRequest({'speed': speed, 'heading': heading, 'flags': flags});

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            DriveControl._targetId, ApiTargetsAndSources.serviceSource,
            DriveControl._deviceId, DriveControl._deviceName,
            DriveControl._driveWithHeadingCommandId, DriveControl._driveWithHeadingCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }

    private _sendResetHeadingCommand() {
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            DriveControl._targetId, ApiTargetsAndSources.serviceSource,
            DriveControl._deviceId, DriveControl._deviceName,
            DriveControl._resetYawCommandId, DriveControl._resetYawCommandName,
            null
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response

        });
    }
}




