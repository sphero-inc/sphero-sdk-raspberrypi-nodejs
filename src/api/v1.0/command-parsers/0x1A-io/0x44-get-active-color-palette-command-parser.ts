// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetActiveColorPaletteResponse(dataRawBytes: Array<number>): IGetActiveColorPaletteResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'rgbIndexBytes' | Type: 'uint8_t' | Size: 48
    let rgbIndexBytesValues: Array<number> = []
    for (let i: number = 0; i < 48; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let rgbIndexBytesBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let rgbIndexBytes: number = ByteConversionUtilities.byteArrayToInt8(rgbIndexBytesBytes);
        currentIndex += rgbIndexBytesBytes.length;
        rgbIndexBytesValues.push(rgbIndexBytes);
    }
    
    let getActiveColorPaletteResponse: IGetActiveColorPaletteResponse = {
        rgbIndexBytes: rgbIndexBytesValues
    };
    
    return getActiveColorPaletteResponse;
}

export interface IGetActiveColorPaletteResponse {
    readonly rgbIndexBytes: Array<number>;
}
