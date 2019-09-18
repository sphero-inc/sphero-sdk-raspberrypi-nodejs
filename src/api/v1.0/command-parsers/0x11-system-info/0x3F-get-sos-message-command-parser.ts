// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetSosMessageResponse(dataRawBytes: Array<number>): IGetSosMessageResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'sosMessage' | Type: 'uint8_t' (ENUM) | Size: 1
    let sosMessageBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let sosMessage: number = ByteConversionUtilities.byteArrayToInt8(sosMessageBytes);
    currentIndex += sosMessageBytes.length;
    
    let getSosMessageResponse: IGetSosMessageResponse = {
        sosMessage: sosMessage
    };
    
    return getSosMessageResponse;
}

export interface IGetSosMessageResponse {
    readonly sosMessage: number;
}
