// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetLocatorFlagsRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'flags' | Type: 'uint8_t' (BITMASK) | Size: 1
    let flags: number = requestBody.flags;
    let flagsBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(flags);
    dataRawBytes = dataRawBytes.concat(flagsBytes);
    
    return dataRawBytes;
}
