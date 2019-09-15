// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetCompressedFramePlayerFrameInfoTypeResponse(dataRawBytes: Array<number>): IGetCompressedFramePlayerFrameInfoTypeResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'frameInfoType' | Type: 'uint8_t' (ENUM) | Size: 1
    let frameInfoTypeBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let frameInfoType: number = ByteConversionUtilities.byteArrayToInt8(frameInfoTypeBytes);
    currentIndex += frameInfoTypeBytes.length;
    
    let getCompressedFramePlayerFrameInfoTypeResponse: IGetCompressedFramePlayerFrameInfoTypeResponse = {
        frameInfoType: frameInfoType
    };
    
    return getCompressedFramePlayerFrameInfoTypeResponse;
}

export interface IGetCompressedFramePlayerFrameInfoTypeResponse {
    readonly frameInfoType: number;
}
