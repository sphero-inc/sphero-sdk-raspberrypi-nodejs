import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'

export interface IStreamingServiceAttribute {
    readonly name: string;

    readonly minimumValue: number;
    readonly maximumValue: number;

    parseAttributeBytesToFloatValues(dataRawBytes: Array<number>, previousMin: number, previousMax: number): number;
}


export class StreamingServiceAttribute implements IStreamingServiceAttribute {
    protected _name: string = '';
    public get name(): string {
        return this._name;
    }

    protected _minimumValue: number = 0;
    public get minimumValue(): number {
        return this._minimumValue;
    }

    protected _maximumValue: number = 0;
    public get maximumValue(): number {
        return this._maximumValue;
    }

    constructor(name: string, minimumValue: number, maximumValue: number) {
        this._name = name;

        this._minimumValue = minimumValue;
        this._maximumValue = maximumValue;
    }

    public parseAttributeBytesToFloatValues(dataRawBytes: Array<number>, minimumIn: number, maximumIn: number): number {
        let streamingServiceAttributeData: number = ByteConversionUtilities.byteArrayToNumber(dataRawBytes.reverse());
        return ByteConversionUtilities.normalize(streamingServiceAttributeData, minimumIn, maximumIn, this._minimumValue, this._maximumValue);
    }
}


