// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSensorStreamingDataNotifyResponse(dataRawBytes: Array<number>): IGetStreamingData {
    let currentIndex: number = 0;

    // Index: 0 | Name: 'pitch' | Type: 'float' | Size: 1
    let pitchBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let pitch: number = ByteConversionUtilities.byteArrayToFloat(pitchBytes.reverse());
    currentIndex += pitchBytes.length;

    // Index: 1 | Name: 'roll' | Type: 'float' | Size: 1
    let rollBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let roll: number = ByteConversionUtilities.byteArrayToFloat(rollBytes.reverse());
    currentIndex += rollBytes.length;

    // Index: 2 | Name: 'yaw' | Type: 'float' | Size: 1
    let yawBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let yaw: number = ByteConversionUtilities.byteArrayToFloat(yawBytes.reverse());
    currentIndex += yawBytes.length;

    let getStreamingData: IGetStreamingData = {
        pitch: pitch,
        roll: roll,
        yaw: yaw
    };

    return getStreamingData;
}

export interface IGetStreamingData {
    readonly pitch: number;
    readonly roll: number;
    readonly yaw: number;
}
