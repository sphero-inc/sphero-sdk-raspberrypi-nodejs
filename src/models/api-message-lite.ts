

export interface IApiMessageLite {
    readonly deviceId: number;
    readonly deviceName: string;

    readonly commandId: number;
    readonly commandName: string;

    readonly sourceId: number;

    readonly data: object | null;
}

export class ApiMessageLite implements IApiMessageLite {
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

    protected _sourceId: number = 0x00;
    public get sourceId(): number {
        return this._sourceId
    }

    protected _data: object | null = null;
    public get data(): object | null {
        return this._data;
    }

    constructor(deviceId: number, deviceName: string,
                commandId: number, commandName: string,
                sourceId: number, data: object | null ) {

        this._deviceId = deviceId;
        this._deviceName = deviceName;

        this._commandId = commandId;
        this._commandName = commandName;

        this._sourceId = sourceId;

        this._data = data;
    }
}
