// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGyroMaxNotifyResponse(dataRawBytes: Array<number>): IGyroMaxNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'flags' | Type: 'uint8_t' (BITMASK) | Size: 1
    let flagsBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let flags: number = ByteConversionUtilities.byteArrayToInt8(flagsBytes);
    currentIndex += flagsBytes.length;
    
    let gyroMaxNotifyResponse: IGyroMaxNotifyResponse = {
        flags: flags
    };
    
    return gyroMaxNotifyResponse;
}

export interface IGyroMaxNotifyResponse {
    readonly flags: number;
}
