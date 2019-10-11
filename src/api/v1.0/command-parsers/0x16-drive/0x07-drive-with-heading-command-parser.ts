// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseDriveWithHeadingRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'speed' | Type: 'uint8_t' | Size: 1
    let speed: number = requestBody.speed;
    let speedBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(speed);
    dataRawBytes = dataRawBytes.concat(speedBytes);
    
    // Index: 1 | Name: 'heading' | Type: 'uint16_t' | Size: 1
    let heading: number = requestBody.heading;
    let headingBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(heading).reverse();
    dataRawBytes = dataRawBytes.concat(headingBytes);
    
    // Index: 2 | Name: 'flags' | Type: 'uint8_t' (BITMASK) | Size: 1
    let flags: number = requestBody.flags;
    let flagsBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(flags);
    dataRawBytes = dataRawBytes.concat(flagsBytes);
    
    return dataRawBytes;
}
