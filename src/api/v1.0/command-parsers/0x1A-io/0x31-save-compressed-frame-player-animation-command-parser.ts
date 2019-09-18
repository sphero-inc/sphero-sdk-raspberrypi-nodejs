// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSaveCompressedFramePlayerAnimationRequest(requestBody: any): Array<number> {
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
    
    // Index: 5 | Name: 'frameCount' | Type: 'uint16_t' | Size: 1
    let frameCount: number = requestBody.frameCount;
    let frameCountBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(frameCount).reverse();
    dataRawBytes = dataRawBytes.concat(frameCountBytes);
    
    // Index: 6 | Name: 'frameIndexes' | Type: 'uint16_t' | Size: 600
    for (let i: number = 0; i < requestBody.frameIndexes.length && i < 600; i++) {
        let frameIndexes: number = requestBody.frameIndexes[i];
        let frameIndexesBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(frameIndexes).reverse();
        dataRawBytes = dataRawBytes.concat(frameIndexesBytes);
    }
    
    return dataRawBytes;
}
