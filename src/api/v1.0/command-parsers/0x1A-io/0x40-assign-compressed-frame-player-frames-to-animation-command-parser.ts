// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseAssignCompressedFramePlayerFramesToAnimationRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'animationIndex' | Type: 'uint8_t' | Size: 1
    let animationIndex: number = requestBody.animationIndex;
    let animationIndexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(animationIndex);
    dataRawBytes = dataRawBytes.concat(animationIndexBytes);
    
    // Index: 1 | Name: 'startFrameIndex' | Type: 'uint16_t' | Size: 1
    let startFrameIndex: number = requestBody.startFrameIndex;
    let startFrameIndexBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(startFrameIndex).reverse();
    dataRawBytes = dataRawBytes.concat(startFrameIndexBytes);
    
    // Index: 2 | Name: 'frameIndices' | Type: 'uint16_t' | Size: 150
    for (let i: number = 0; i < requestBody.frameIndices.length && i < 150; i++) {
        let frameIndices: number = requestBody.frameIndices[i];
        let frameIndicesBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(frameIndices).reverse();
        dataRawBytes = dataRawBytes.concat(frameIndicesBytes);
    }
    
    return dataRawBytes;
}
