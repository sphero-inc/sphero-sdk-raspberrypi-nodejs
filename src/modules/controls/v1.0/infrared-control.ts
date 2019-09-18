import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../../../models/api-command-message';
import {IApiDal} from '../../api-dal-interface';
import {ApiTargetsAndSources} from '../../../constants';
import {parseStartRobotToRobotInfraredBroadcastingRequest} from '../../../api/v1.0/command-parsers/0x18-sensor/0x27-start-robot-to-robot-infrared-broadcasting-command-parser';
import {parseStartRobotToRobotInfraredFollowingRequest} from '../../../api/v1.0/command-parsers/0x18-sensor/0x28-start-robot-to-robot-infrared-following-command-parser';
import {parseEnableRobotInfraredMessageNotifyRequest} from '../../../api/v1.0/command-parsers/0x18-sensor/0x3E-enable-robot-infrared-message-notify-command-parser';
import {parseSendInfraredMessageRequest} from '../../../api/v1.0/command-parsers/0x18-sensor/0x3F-send-infrared-message-command-parser';

export class InfraredControl {
    private static readonly _targetId: number = 0x02;

    private static readonly _deviceId: number = 0x18;
    private static readonly _deviceName: string = 'Sensor (0x18)';

    private static readonly _startInfraredBroadcastingCommandId: number = 0x27;
    private static readonly _startInfraredBroadcastingCommandName: string = 'Start Robot to Robot Infrared Broadcasting';

    private static readonly _stopInfraredBroadcastingCommandId: number = 0x09;
    private static readonly _stopInfraredBroadcastingCommandName: string = 'Stop Robot to Robot Infrared Broadcasting';

    private static readonly _startInfraredFollowingCommandId: number = 0x28;
    private static readonly _startInfraredFollowingCommandName: string = 'Start Robot to Robot Infrared Following';

    private static readonly _stopInfraredFollowingCommandId: number = 0x32;
    private static readonly _stopInfraredFollowingCommandName: string = 'Stop Robot to Robot Infrared Following';

    private static readonly _sendRobotToRobotInfraredMessageCommandId: number = 0x3F;
    private static readonly _sendRobotToRobotInfraredMessageCommandName: string = 'Send Robot to Robot Infrared Message';

    private static readonly _enableRobotInfraredMessageNotifyCommandId: number = 0x3E;
    private static readonly _enableRobotInfraredMessageNotifyCommandName: string = 'Enable/Disable Robot Infrared Message Async';

    private readonly _apiDal: IApiDal;

    constructor(apiDal: IApiDal) {
        this._apiDal = apiDal;
    }

    public startInfraredBroadcasting(farCode: number, nearCode: number) {
        this._sendStartRobotToRobotInfraredBroadcastingCommand(farCode, nearCode);
    }

    public stopInfraredBroadcasting() {
        this._sendStopRobotToRobotInfraredBroadcastingCommand();
    }

    public startInfraredFollowing(farCode: number, nearCode: number) {
        this._sendStartRobotToRobotInfraredFollowingCommand(farCode, nearCode);
    }

    public stopInfraredFollowing() {
        this._sendStopRobotToRobotInfraredFollowingCommand();
    }

    public sendInfraredMessages(messages: Array<number>, strength: number) {
        for(let message of messages){
            this._sendSendInfraredMessageCommand(message, strength, strength, strength, strength);
        }
    }

    public enableRobotInfraredMessageNotify(isEnabled: boolean) {
        this._sendEnableRobotInfraredMessageNotifyCommand(isEnabled);
    }

    private _sendStartRobotToRobotInfraredBroadcastingCommand(farCode: number, nearCode: number) {
        let dataRawBytes: Array<number> = parseStartRobotToRobotInfraredBroadcastingRequest({'farCode': farCode, 'nearCode': nearCode})

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            InfraredControl._targetId, ApiTargetsAndSources.serviceSource,
            InfraredControl._deviceId, InfraredControl._deviceName,
            InfraredControl._startInfraredBroadcastingCommandId, InfraredControl._startInfraredBroadcastingCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }

    private _sendStopRobotToRobotInfraredBroadcastingCommand() {
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            InfraredControl._targetId, ApiTargetsAndSources.serviceSource,
            InfraredControl._deviceId, InfraredControl._deviceName,
            InfraredControl._stopInfraredBroadcastingCommandId, InfraredControl._stopInfraredBroadcastingCommandName,
            null
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }

    private _sendStartRobotToRobotInfraredFollowingCommand(farCode: number, nearCode: number) {
        let dataRawBytes: Array<number> = parseStartRobotToRobotInfraredFollowingRequest({'farCode': farCode, 'nearCode': nearCode})

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            InfraredControl._targetId, ApiTargetsAndSources.serviceSource,
            InfraredControl._deviceId, InfraredControl._deviceName,
            InfraredControl._startInfraredFollowingCommandId, InfraredControl._startInfraredFollowingCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }

    private _sendStopRobotToRobotInfraredFollowingCommand() {
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            InfraredControl._targetId, ApiTargetsAndSources.serviceSource,
            InfraredControl._deviceId, InfraredControl._deviceName,
            InfraredControl._stopInfraredFollowingCommandId, InfraredControl._stopInfraredFollowingCommandName,
            null
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }

    private _sendSendInfraredMessageCommand(infraredCode: number, frontStrength: number, rearStrength: number, leftStrength: number, rightStrength: number) {
        let dataRawBytes: Array<number> = parseSendInfraredMessageRequest({'infraredCode': infraredCode,
            'frontStrength': frontStrength, 'rearStrength': rearStrength, 'leftStrength': leftStrength, 'rightStrength': rightStrength});

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            InfraredControl._targetId, ApiTargetsAndSources.serviceSource,
            InfraredControl._deviceId, InfraredControl._deviceName,
            InfraredControl._sendRobotToRobotInfraredMessageCommandId, InfraredControl._sendRobotToRobotInfraredMessageCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }

    private _sendEnableRobotInfraredMessageNotifyCommand(isEnabled: boolean) {
        let dataRawBytes: Array<number> = parseEnableRobotInfraredMessageNotifyRequest({'isEnabled': isEnabled});

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            InfraredControl._targetId, ApiTargetsAndSources.serviceSource,
            InfraredControl._deviceId, InfraredControl._deviceName,
            InfraredControl._enableRobotInfraredMessageNotifyCommandId, InfraredControl._enableRobotInfraredMessageNotifyCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response
        });
    }
}


