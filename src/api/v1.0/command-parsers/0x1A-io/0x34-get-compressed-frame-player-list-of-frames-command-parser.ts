// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetCompressedFramePlayerListOfFramesResponse(dataRawBytes: Array<number>): IGetCompressedFramePlayerListOfFramesResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'frameIndexes' | Type: 'uint16_t' | Size: 1000
    let frameIndexesValues: Array<number> = []
    for (let i: number = 0; i < 1000; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let frameIndexesBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
        let frameIndexes: number = ByteConversionUtilities.byteArrayToInt16(frameIndexesBytes.reverse());
        currentIndex += frameIndexesBytes.length;
        frameIndexesValues.push(frameIndexes);
    }
    
    let getCompressedFramePlayerListOfFramesResponse: IGetCompressedFramePlayerListOfFramesResponse = {
        frameIndexes: frameIndexesValues
    };
    
    return getCompressedFramePlayerListOfFramesResponse;
}

export interface IGetCompressedFramePlayerListOfFramesResponse {
    readonly frameIndexes: Array<number>;
}
