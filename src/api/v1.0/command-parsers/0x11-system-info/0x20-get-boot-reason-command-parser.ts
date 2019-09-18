// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBootReasonResponse(dataRawBytes: Array<number>): IGetBootReasonResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'bootReason' | Type: 'uint8_t' (ENUM) | Size: 1
    let bootReasonBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let bootReason: number = ByteConversionUtilities.byteArrayToInt8(bootReasonBytes);
    currentIndex += bootReasonBytes.length;
    
    let getBootReasonResponse: IGetBootReasonResponse = {
        bootReason: bootReason
    };
    
    return getBootReasonResponse;
}

export interface IGetBootReasonResponse {
    readonly bootReason: number;
}
