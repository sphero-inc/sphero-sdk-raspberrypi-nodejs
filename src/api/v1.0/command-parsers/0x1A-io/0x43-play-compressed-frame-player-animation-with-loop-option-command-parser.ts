// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parsePlayCompressedFramePlayerAnimationWithLoopOptionRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'animationIndex' | Type: 'uint8_t' | Size: 1
    let animationIndex: number = requestBody.animationIndex;
    let animationIndexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(animationIndex);
    dataRawBytes = dataRawBytes.concat(animationIndexBytes);
    
    // Index: 1 | Name: 'isLooping' | Type: 'bool' | Size: 1
    let isLooping: boolean = requestBody.isLooping;
    let isLoopingBytes: Array<number> = ByteConversionUtilities.boolToByteArray(isLooping);
    dataRawBytes = dataRawBytes.concat(isLoopingBytes);
    
    return dataRawBytes;
}
