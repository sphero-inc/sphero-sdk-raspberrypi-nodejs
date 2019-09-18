import {IStreamingServiceAttribute} from './streaming-service-attribute'
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'

export interface IStreamingService {
    readonly id: number;
    readonly name: string;
    readonly isEnabled: boolean;

    readonly dataSizeEnum: number;
    readonly bytesPerStreamingServiceData: number;

    parseStreamingServiceBytesToObject(dataRawBytes: Array<number>): IStreamingServiceData;
    enable(): void;
    disable(): void;

}


export class StreamingService implements IStreamingService {
    protected _id: number = 0;
    public get id(): number {
        return this._id;
    }

    protected _name: string = '';
    public get name(): string {
        return this._name;
    }

    private readonly _streamingServiceAttributes: Array<IStreamingServiceAttribute>;

    private _isEnabled: boolean;
    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    protected _dataSizeEnum: number = 0;
    public get dataSizeEnum(): number {
        return this._dataSizeEnum;
    }

    public get bytesPerStreamingServiceData(): number {
        return this._bytesPerStreamingServiceAttributeData * this._streamingServiceAttributes.length;
    }

    constructor(id: number, name: string,
                streamingServiceAttributes: Array<IStreamingServiceAttribute>, dataSizeEnum: number) {

        this._id = id;
        this._name = name;

        this._streamingServiceAttributes = streamingServiceAttributes;

        this._dataSizeEnum = dataSizeEnum;
    }

    public enable(): void {
        this._isEnabled = true;
    }

    public disable(): void {
        this._isEnabled = false;
    }

    public parseStreamingServiceBytesToObject(dataRawBytes: Array<number>): IStreamingServiceData {
        if (dataRawBytes.length != this.bytesPerStreamingServiceData)
            throw new Error('input bytes length and expected bytes length mismatch');

        let streamingServiceData: IStreamingServiceData = {};

        let currentIndex: number = 0;
        for (let streamingServiceAttribute of this._streamingServiceAttributes) {
            let streamingServiceAttributeDataBytes: Array<number> = ByteConversionUtilities.sliceBytes(dataRawBytes, currentIndex, this._bytesPerStreamingServiceAttributeData);
            streamingServiceData[streamingServiceAttribute.name] = streamingServiceAttribute.parseAttributeBytesToFloatValues(streamingServiceAttributeDataBytes, 0, this._dataSizeMaximum);
            currentIndex += streamingServiceAttributeDataBytes.length;
        }
        return streamingServiceData;
    }

    private get _bytesPerStreamingServiceAttributeData(): number {
        let bitSize: number | undefined = StreamingService.dataSizeToBits.get(this._dataSizeEnum);
        if (bitSize == undefined)
            return 0;
        return bitSize / 8;
    }

    private get _dataSizeMaximum(): number{
        let maxValue: number | undefined = StreamingService.dataSizeToMaximumValue.get(this._dataSizeEnum);
        if (maxValue == undefined)
            return 0;
        return maxValue;
    }

    private static readonly dataSizeToBits: Map<number, number> = new Map<number, number>([[0x00, 8], [0x01, 16], [0x02, 32]]);

    private static readonly dataSizeToMaximumValue: Map<number, number> = new Map<number, number>([[0x00, ByteConversionUtilities.uint8MaxValue],
        [0x01, ByteConversionUtilities.uint16MaxValue], [0x02, ByteConversionUtilities.uint32MaxValue]]);

}

export interface IStreamingServiceData {
    [streamingServiceAttributeName: string]: number;
}


