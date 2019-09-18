// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSaveCompressedFramePlayerAnimationWithoutFramesRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'animationIndex' | Type: 'uint8_t' | Size: 1
    let animationIndex: number = requestBody.animationIndex;
    let animationIndexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(animationIndex);
    dataRawBytes = dataRawBytes.concat(animationIndexBytes);
    
    // Index: 1 | Name: 'speedFps' | Type: 'uint8_t' | Size: 1
    let speedFps: number = requestBody.speedFps;
    let speedFpsBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(speedFps);
    dataRawBytes = dataRawBytes.concat(speedFpsBytes);
    
    // Index: 2 | Name: 'isFadeEnabled' | Type: 'bool' | Size: 1
    let isFadeEnabled: boolean = requestBody.isFadeEnabled;
    let isFadeEnabledBytes: Array<number> = ByteConversionUtilities.boolToByteArray(isFadeEnabled);
    dataRawBytes = dataRawBytes.concat(isFadeEnabledBytes);
    
    // Index: 3 | Name: 'paletteColorCount' | Type: 'uint8_t' | Size: 1
    let paletteColorCount: number = requestBody.paletteColorCount;
    let paletteColorCountBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(paletteColorCount);
    dataRawBytes = dataRawBytes.concat(paletteColorCountBytes);
    
    // Index: 4 | Name: 'paletteRgbValues' | Type: 'uint8_t' | Size: 48
    for (let i: number = 0; i < requestBody.paletteRgbValues.length && i < 48; i++) {
        let paletteRgbValues: number = requestBody.paletteRgbValues[i];
        let paletteRgbValuesBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(paletteRgbValues);
        dataRawBytes = dataRawBytes.concat(paletteRgbValuesBytes);
    }
    
    // Index: 5 | Name: 'totalFrameCount' | Type: 'uint16_t' | Size: 1
    let totalFrameCount: number = requestBody.totalFrameCount;
    let totalFrameCountBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(totalFrameCount).reverse();
    dataRawBytes = dataRawBytes.concat(totalFrameCountBytes);
    
    return dataRawBytes;
}

export function parseSaveCompressedFramePlayerAnimationWithoutFramesResponse(dataRawBytes: Array<number>): ISaveCompressedFramePlayerAnimationWithoutFramesResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'savedAnimations' | Type: 'uint8_t' | Size: 50
    let savedAnimationsValues: Array<number> = []
    for (let i: number = 0; i < 50; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let savedAnimationsBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let savedAnimations: number = ByteConversionUtilities.byteArrayToInt8(savedAnimationsBytes);
        currentIndex += savedAnimationsBytes.length;
        savedAnimationsValues.push(savedAnimations);
    }
    
    let saveCompressedFramePlayerAnimationWithoutFramesResponse: ISaveCompressedFramePlayerAnimationWithoutFramesResponse = {
        savedAnimations: savedAnimationsValues
    };
    
    return saveCompressedFramePlayerAnimationWithoutFramesResponse;
}

export interface ISaveCompressedFramePlayerAnimationWithoutFramesResponse {
    readonly savedAnimations: Array<number>;
}
