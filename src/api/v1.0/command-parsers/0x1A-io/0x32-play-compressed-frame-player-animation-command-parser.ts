// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parsePlayCompressedFramePlayerAnimationRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'animationIndex' | Type: 'uint8_t' | Size: 1
    let animationIndex: number = requestBody.animationIndex;
    let animationIndexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(animationIndex);
    dataRawBytes = dataRawBytes.concat(animationIndexBytes);
    
    return dataRawBytes;
}
