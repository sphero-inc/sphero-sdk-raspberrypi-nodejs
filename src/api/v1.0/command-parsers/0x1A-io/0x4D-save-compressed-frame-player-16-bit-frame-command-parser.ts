// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSaveCompressedFramePlayer16BitFrameRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'frameIndex' | Type: 'uint16_t' | Size: 1
    let frameIndex: number = requestBody.frameIndex;
    let frameIndexBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(frameIndex).reverse();
    dataRawBytes = dataRawBytes.concat(frameIndexBytes);
    
    // Index: 1 | Name: 'colorIndexBit0' | Type: 'uint16_t' | Size: 1
    let colorIndexBit0: number = requestBody.colorIndexBit0;
    let colorIndexBit0Bytes: Array<number> = ByteConversionUtilities.int16ToByteArray(colorIndexBit0).reverse();
    dataRawBytes = dataRawBytes.concat(colorIndexBit0Bytes);
    
    // Index: 2 | Name: 'colorIndexBit1' | Type: 'uint16_t' | Size: 1
    let colorIndexBit1: number = requestBody.colorIndexBit1;
    let colorIndexBit1Bytes: Array<number> = ByteConversionUtilities.int16ToByteArray(colorIndexBit1).reverse();
    dataRawBytes = dataRawBytes.concat(colorIndexBit1Bytes);
    
    // Index: 3 | Name: 'colorIndexBit2' | Type: 'uint16_t' | Size: 1
    let colorIndexBit2: number = requestBody.colorIndexBit2;
    let colorIndexBit2Bytes: Array<number> = ByteConversionUtilities.int16ToByteArray(colorIndexBit2).reverse();
    dataRawBytes = dataRawBytes.concat(colorIndexBit2Bytes);
    
    // Index: 4 | Name: 'colorIndexBit3' | Type: 'uint16_t' | Size: 1
    let colorIndexBit3: number = requestBody.colorIndexBit3;
    let colorIndexBit3Bytes: Array<number> = ByteConversionUtilities.int16ToByteArray(colorIndexBit3).reverse();
    dataRawBytes = dataRawBytes.concat(colorIndexBit3Bytes);
    
    return dataRawBytes;
}
