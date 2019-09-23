// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseMotorCurrentNotifyResponse(dataRawBytes: Array<number>): IMotorCurrentNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'leftMotorCurrent' | Type: 'float' | Size: 1 | Units: amps
    let leftMotorCurrentBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let leftMotorCurrent: number = ByteConversionUtilities.byteArrayToFloat(leftMotorCurrentBytes.reverse());
    currentIndex += leftMotorCurrentBytes.length;
    
    // Index: 1 | Name: 'rightMotorCurrent' | Type: 'float' | Size: 1 | Units: amps
    let rightMotorCurrentBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let rightMotorCurrent: number = ByteConversionUtilities.byteArrayToFloat(rightMotorCurrentBytes.reverse());
    currentIndex += rightMotorCurrentBytes.length;
    
    // Index: 2 | Name: 'upTime' | Type: 'uint64_t' | Size: 1 | Units: milliseconds
    let upTimeBytes: Array<number> = ByteConversionUtilities.getInt64Bytes(dataRawBytes, currentIndex);
    let upTime: number = ByteConversionUtilities.byteArrayToInt64(upTimeBytes.reverse());
    currentIndex += upTimeBytes.length;
    
    let motorCurrentNotifyResponse: IMotorCurrentNotifyResponse = {
        leftMotorCurrent: leftMotorCurrent,
        rightMotorCurrent: rightMotorCurrent,
        upTime: upTime
    };
    
    return motorCurrentNotifyResponse;
}

export interface IMotorCurrentNotifyResponse {
    readonly leftMotorCurrent: number;
    readonly rightMotorCurrent: number;
    readonly upTime: number;
}
