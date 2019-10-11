// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseMotorStallNotifyResponse(dataRawBytes: Array<number>): IMotorStallNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'motorIndex' | Type: 'uint8_t' (ENUM) | Size: 1
    let motorIndexBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let motorIndex: number = ByteConversionUtilities.byteArrayToInt8(motorIndexBytes);
    currentIndex += motorIndexBytes.length;
    
    // Index: 1 | Name: 'isTriggered' | Type: 'bool' | Size: 1
    let isTriggeredBytes: Array<number> = ByteConversionUtilities.getBoolBytes(dataRawBytes, currentIndex);
    let isTriggered: boolean = ByteConversionUtilities.byteArrayToBool(isTriggeredBytes);
    currentIndex += isTriggeredBytes.length;
    
    let motorStallNotifyResponse: IMotorStallNotifyResponse = {
        motorIndex: motorIndex,
        isTriggered: isTriggered
    };
    
    return motorStallNotifyResponse;
}

export interface IMotorStallNotifyResponse {
    readonly motorIndex: number;
    readonly isTriggered: boolean;
}
