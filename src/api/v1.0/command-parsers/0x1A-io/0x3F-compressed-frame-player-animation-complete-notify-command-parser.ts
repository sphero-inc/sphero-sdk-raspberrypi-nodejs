// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseCompressedFramePlayerAnimationCompleteNotifyResponse(dataRawBytes: Array<number>): ICompressedFramePlayerAnimationCompleteNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'completeEvent' | Type: 'uint8_t' | Size: 1
    let completeEventBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let completeEvent: number = ByteConversionUtilities.byteArrayToInt8(completeEventBytes);
    currentIndex += completeEventBytes.length;
    
    let compressedFramePlayerAnimationCompleteNotifyResponse: ICompressedFramePlayerAnimationCompleteNotifyResponse = {
        completeEvent: completeEvent
    };
    
    return compressedFramePlayerAnimationCompleteNotifyResponse;
}

export interface ICompressedFramePlayerAnimationCompleteNotifyResponse {
    readonly completeEvent: number;
}
