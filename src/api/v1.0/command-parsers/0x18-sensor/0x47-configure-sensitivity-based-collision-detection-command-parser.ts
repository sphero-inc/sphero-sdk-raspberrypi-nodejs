// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseConfigureSensitivityBasedCollisionDetectionRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'sensitivity' | Type: 'uint8_t' (ENUM) | Size: 1
    let sensitivity: number = requestBody.sensitivity;
    let sensitivityBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(sensitivity);
    dataRawBytes = dataRawBytes.concat(sensitivityBytes);
    
    // Index: 1 | Name: 'deadTime' | Type: 'uint16_t' | Size: 1
    let deadTime: number = requestBody.deadTime;
    let deadTimeBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(deadTime).reverse();
    dataRawBytes = dataRawBytes.concat(deadTimeBytes);
    
    return dataRawBytes;
}
