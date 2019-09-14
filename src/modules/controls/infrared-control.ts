import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../../models/api-command-message';
import {IApiDal} from '../api-dal-interface';
import {ApiTargetsAndSources} from '../../constants';
import {parseDriveWithHeadingRequest} from "../../api/v1.0/command-parsers/0x16-drive/0x07-drive-with-heading-command-parser";
import {LedControl} from "./led-control";

export class InfraredControl {
    private static readonly _targetId: number = 0x02;

    private static readonly _deviceId: number = 0x18;
    private static readonly _deviceName: string = 'Sensor (0x18)';

    private static readonly _startInfraredBroadcastingCommandId: number = 0x27;
    private static readonly _startInfraredBroadcastingCommandName: string = "Start Robot to Robot Infrared Broadcasting";

    private static readonly _stopInfraredBroadcastingCommandId: number = 0x09;
    private static readonly _stopInfraredBroadcastingCommandName: string = "Stop Robot to Robot Infrared Broadcasting";

    private static readonly _startInfraredFollowingCommandId: number = 0x28;
    private static readonly _startInfraredFollowing: string = "Start Robot to Robot Infrared Following";

    private static readonly _stopInfraredFollowingCommandId: number = 0x32;
    private static readonly _stopInfraredFollowingCommandName: string = "Stop Robot to Robot Infrared Following";

    private static readonly _sendRobotToRobotInfraredMessageCommandId: number = 0x3F;
    private static readonly _sendRobotToRobotInfraredMessageCommandName: string = "Send Robot to Robot Infrared Message";

    private static readonly _enableOrDisableRobotInfraredMessageAsyncCommandId: number = 0x3E;
    private static readonly _enableOrDisableRobotInfraredMessageAsyncCommandName: string = "Enable/Disable Robot Infrared Message Async";

    private readonly _apiDal: IApiDal;
    private readonly _ledController: LedControl;

    constructor(apiDal: IApiDal) {
        this._apiDal = apiDal;
        this._ledController = new LedControl(apiDal);
    }

    public startInfraredBroadcasting(farCode: number, nearCode: number) {
    }

    public stopInfraredBroadcasting() {
    }

    public startInfraredFollowing(farCode: number, nearCode: number) {
    }

    public stopInfraredFollowing() {
    }

    public sendInfraredMessages(messages: Array<number>, strength: number) {
        // 0x3F Send Robot to Robot Infrared Message
    }

    public listenForInfraredMessage() {
        // 0x3E Enable/Disable Robot Infrared Message Async
    }
}


