// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSosMessageNotifyResponse(dataRawBytes: Array<number>): ISosMessageNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'sosMessage' | Type: 'uint8_t' (ENUM) | Size: 1
    let sosMessageBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let sosMessage: number = ByteConversionUtilities.byteArrayToInt8(sosMessageBytes);
    currentIndex += sosMessageBytes.length;
    
    let sosMessageNotifyResponse: ISosMessageNotifyResponse = {
        sosMessage: sosMessage
    };
    
    return sosMessageNotifyResponse;
}

export interface ISosMessageNotifyResponse {
    readonly sosMessage: number;
}
