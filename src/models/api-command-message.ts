// internal imports
import {IApiMessage, ApiBaseMessage} from './api-message';
import {ApiFlags, ApiTargetsAndSources} from '../constants';


export interface IApiCommandMessage extends IApiMessage {
    readonly commandRawBytes: Array<number>;
}

class ApiCommandMessage extends ApiBaseMessage implements IApiCommandMessage {
    public get messageRawBytes(): Array<number> {
        return this._commandRawBytes;
    }

    private _commandRawBytes: Array<number> = [];
    public get commandRawBytes(): Array<number> {
        return this._commandRawBytes;
    }

    constructor(flags: number, sequenceNumber: number,
                targetId: number, sourceId: number,
                deviceId: number, deviceName: string,
                commandId: number, commandName: string,
                dataRawBytes: Array<number> | null = null) {

        super(
            flags, sequenceNumber,
            targetId, sourceId,
            deviceId, deviceName,
            commandId, commandName,
            dataRawBytes
        );
    }

    protected generateMessageRawBytesInternal(): void {

    }
}

export function buildApiCommandMessage(flags: number, sequenceNumber: number | null,
                                       targetId: number, sourceId: number,
                                       deviceId: number, deviceName: string,
                                       commandId: number, commandName: string,
                                       dataRawBytes: Array<number> | null = null): IApiCommandMessage {

    if (sequenceNumber == null) {
        sequenceNumber = 0x00;  // TODO: own sequence number here?
    }

    let apiMessage: IApiCommandMessage = new ApiCommandMessage(
        flags, sequenceNumber,
        targetId, sourceId,
        deviceId, deviceName,
        commandId, commandName,
        dataRawBytes
    );

    apiMessage.generateMessageRawBytes();

    return apiMessage;
}

export function buildApiCommandMessageWithDefaultFlags(targetId: number, sourceId: number,
                                                       deviceId: number, deviceName: string,
                                                       commandId: number, commandName: string,
                                                       dataRawBytes: Array<number> | null = null): IApiCommandMessage {

    let flags: number = ApiFlags.defaultRequestWithResponseFlags;
    let sequenceNumber: number = 0x00;  // TODO: own sequence number here?

    let apiMessage: IApiCommandMessage = new ApiCommandMessage(
        flags, sequenceNumber,
        targetId, sourceId,
        deviceId, deviceName,
        commandId, commandName,
        dataRawBytes
    );

    apiMessage.generateMessageRawBytes();

    return apiMessage;
}
