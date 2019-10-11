// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSendInfraredMessageRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'infraredCode' | Type: 'uint8_t' | Size: 1
    let infraredCode: number = requestBody.infraredCode;
    let infraredCodeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(infraredCode);
    dataRawBytes = dataRawBytes.concat(infraredCodeBytes);
    
    // Index: 1 | Name: 'frontStrength' | Type: 'uint8_t' | Size: 1
    let frontStrength: number = requestBody.frontStrength;
    let frontStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(frontStrength);
    dataRawBytes = dataRawBytes.concat(frontStrengthBytes);
    
    // Index: 2 | Name: 'leftStrength' | Type: 'uint8_t' | Size: 1
    let leftStrength: number = requestBody.leftStrength;
    let leftStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(leftStrength);
    dataRawBytes = dataRawBytes.concat(leftStrengthBytes);
    
    // Index: 3 | Name: 'rightStrength' | Type: 'uint8_t' | Size: 1
    let rightStrength: number = requestBody.rightStrength;
    let rightStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(rightStrength);
    dataRawBytes = dataRawBytes.concat(rightStrengthBytes);
    
    // Index: 4 | Name: 'rearStrength' | Type: 'uint8_t' | Size: 1
    let rearStrength: number = requestBody.rearStrength;
    let rearStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(rearStrength);
    dataRawBytes = dataRawBytes.concat(rearStrengthBytes);
    
    return dataRawBytes;
}
