// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSaveColorPaletteRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'paletteIndex' | Type: 'uint8_t' (ENUM) | Size: 1
    let paletteIndex: number = requestBody.paletteIndex;
    let paletteIndexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(paletteIndex);
    dataRawBytes = dataRawBytes.concat(paletteIndexBytes);
    
    return dataRawBytes;
}
