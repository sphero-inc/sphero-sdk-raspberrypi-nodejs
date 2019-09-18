// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetCompressedFramePlayerOneColorRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'red' | Type: 'uint8_t' | Size: 1
    let red: number = requestBody.red;
    let redBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(red);
    dataRawBytes = dataRawBytes.concat(redBytes);
    
    // Index: 1 | Name: 'green' | Type: 'uint8_t' | Size: 1
    let green: number = requestBody.green;
    let greenBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(green);
    dataRawBytes = dataRawBytes.concat(greenBytes);
    
    // Index: 2 | Name: 'blue' | Type: 'uint8_t' | Size: 1
    let blue: number = requestBody.blue;
    let blueBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(blue);
    dataRawBytes = dataRawBytes.concat(blueBytes);
    
    return dataRawBytes;
}
