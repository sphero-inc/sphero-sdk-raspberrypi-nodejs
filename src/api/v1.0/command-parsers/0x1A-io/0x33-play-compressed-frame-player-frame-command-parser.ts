// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parsePlayCompressedFramePlayerFrameRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'frameIndex' | Type: 'uint16_t' | Size: 1
    let frameIndex: number = requestBody.frameIndex;
    let frameIndexBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(frameIndex).reverse();
    dataRawBytes = dataRawBytes.concat(frameIndexBytes);
    
    return dataRawBytes;
}
