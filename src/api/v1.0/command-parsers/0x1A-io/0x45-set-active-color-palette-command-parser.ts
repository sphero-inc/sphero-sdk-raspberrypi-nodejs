// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetActiveColorPaletteRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'rgbIndexBytes' | Type: 'uint8_t' | Size: 48
    for (let i: number = 0; i < requestBody.rgbIndexBytes.length && i < 48; i++) {
        let rgbIndexBytes: number = requestBody.rgbIndexBytes[i];
        let rgbIndexBytesBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(rgbIndexBytes);
        dataRawBytes = dataRawBytes.concat(rgbIndexBytesBytes);
    }
    
    return dataRawBytes;
}
