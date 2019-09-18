// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseStartStreamingServiceRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'period' | Type: 'uint16_t' | Size: 1
    let period: number = requestBody.period;
    let periodBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(period).reverse();
    dataRawBytes = dataRawBytes.concat(periodBytes);
    
    return dataRawBytes;
}
