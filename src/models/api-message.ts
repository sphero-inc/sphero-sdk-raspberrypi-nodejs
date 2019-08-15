import {ApiFlags} from '../constants';
import {ApiParserFactory} from '../modules/api-parser';


export interface IApiMessageLight {
    readonly deviceId: number;
    readonly deviceName: string;

    readonly commandId: number;
    readonly commandName: string;

    readonly data: Array<number> | string;
}


export class ApiMessageLight implements IApiMessageLight {
    readonly deviceId: number;
    readonly deviceName: string;

    readonly commandId: number;
    readonly commandName: string;

    readonly data: Array<number> | string;

    constructor(deviceId: number, deviceName: string,
                commandId: number, commandName: string,
                data: Array<number> | string ) {

        this.deviceId = deviceId;
        this.deviceName = deviceName;

        this.commandId = commandId;
        this.commandName = commandName;

        this.data = data;
    }
}

export interface IApiMessage {
    readonly flags: number;
    readonly sequenceNumber: number;

    readonly isCommand: boolean;
    readonly isResponse: boolean;
    readonly isRequestingResponse: boolean;

    readonly targetId: number;
    readonly sourceId: number;

    readonly deviceId: number;
    readonly deviceName: string;

    readonly commandId: number;
    readonly commandName: string;

    readonly dataRawBytes: Array<number>;   // Payload raw bytes
    readonly messageRawBytes: Array<number>;    // Full message raw bytes

    readonly data: object | null;

    readonly errorCode: number | null;
    readonly errorMessage: string | null;
    readonly hasError: boolean;

    generateMessageRawBytes(): void;

    associateError(errorCode: number, errorMessage: string): void;

    prettyPrint(): string;
}



export abstract class ApiBaseMessage implements IApiMessage {
    protected _flags: number = 0x00;
    public get flags(): number {
        return this._flags;
    }

    protected _sequenceNumber: number = 0x00;
    public get sequenceNumber(): number {
        return this._sequenceNumber;
    }

    public get isCommand(): boolean {
        return !this.isResponse;
    }

    public get isResponse(): boolean {
        return (this.flags & (ApiFlags.isResponse)) == (ApiFlags.isResponse);
    }

    public get isRequestingResponse(): boolean {
        return (this.flags & (ApiFlags.requestsResponse)) == (ApiFlags.requestsResponse);
    }

    protected _targetId: number = 0x00;
    public get targetId(): number {
        return this._targetId;
    }

    protected _sourceId: number = 0x00;
    public get sourceId(): number {
        return this._sourceId;
    }

    protected _deviceId: number = 0x00;
    public get deviceId(): number {
        return this._deviceId;
    }

    protected _deviceName: string = '';
    public get deviceName(): string {
        return this._deviceName;
    }

    protected _commandId: number = 0x00;
    public get commandId(): number {
        return this._commandId;
    }

    protected _commandName: string = '';
    public get commandName(): string {
        return this._commandName;
    }

    protected _dataRawBytes: Array<number> = [];
    public get dataRawBytes(): Array<number> {
        return this._dataRawBytes;
    }

    protected _messageRawBytes: Array<number> = [];
    public get messageRawBytes(): Array<number> {
        return this._messageRawBytes;
    }

    protected _data: object | null = null;
    public get data(): object | null {
        return this._data;
    }

    protected _errorCode: number | null = null;
    public get errorCode(): number | null {
        return this._errorCode;
    }

    protected _errorMessage: string | null = null;
    public get errorMessage(): string | null {
        return this._errorMessage;
    }

    protected _hasError: boolean = false;
    public get hasError(): boolean {
        return this._hasError;
    }

    protected constructor(flags: number, sequenceNumber: number,
                          targetId: number, sourceId: number,
                          deviceId: number, deviceName: string,
                          commandId: number, commandName: string,
                          dataRawBytes: Array<number> | null = null) {

        this._flags = flags;
        this._sequenceNumber = sequenceNumber;

        this._targetId = targetId;
        this._sourceId = sourceId;

        this._deviceId = deviceId;
        this._deviceName = deviceName;

        this._commandId = commandId;
        this._commandName = commandName;

        if (dataRawBytes != null) {
            this._dataRawBytes = dataRawBytes;
        }
    }

    // TODO: rename to serialize
    public generateMessageRawBytes(): void {
        this._messageRawBytes = ApiParserFactory.getApiParser().generateRawBytesForApiMessage(this);
    }

    public associateError(errorCode: number, errorMessage: string): void {
        this._errorCode = errorCode;
        this._errorMessage = errorMessage;
        this._hasError = true;
    }

    public prettyPrint(): string {
        return '';  // TODO: implement this
    }
}
