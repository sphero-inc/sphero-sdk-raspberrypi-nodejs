// internal imports
import {IApiMessage} from './model-interfaces'


export class ApiMessage implements IApiMessage {
    public flags: number = 0x00;

    public targetId: number = 0x00;
    public sourceId: number = 0x00;

    public deviceId: number = 0x00;
    public deviceName: string = '';
    public commandId: number = 0x00;
    public commandName: string = '';

    public sequenceNumber: number = 0x00;

    public dataRawBytes: Array<number> = [];
    public requestRawBytes: Array<number> = [];
    public responseRawBytes: Array<number> = [];

    public data: object | null = null;
    public error: string | null = null;
    public isAck: boolean = false;
}
