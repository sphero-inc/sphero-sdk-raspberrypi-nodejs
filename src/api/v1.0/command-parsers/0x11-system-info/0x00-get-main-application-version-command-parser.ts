// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetMainApplicationVersionResponse(dataRawBytes: Array<number>): IGetMainApplicationVersionResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'major' | Type: 'uint16_t' | Size: 1
    let majorBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let major: number = ByteConversionUtilities.byteArrayToInt16(majorBytes.reverse());
    currentIndex += majorBytes.length;
    
    // Index: 1 | Name: 'minor' | Type: 'uint16_t' | Size: 1
    let minorBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let minor: number = ByteConversionUtilities.byteArrayToInt16(minorBytes.reverse());
    currentIndex += minorBytes.length;
    
    // Index: 2 | Name: 'revision' | Type: 'uint16_t' | Size: 1
    let revisionBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let revision: number = ByteConversionUtilities.byteArrayToInt16(revisionBytes.reverse());
    currentIndex += revisionBytes.length;
    
    let getMainApplicationVersionResponse: IGetMainApplicationVersionResponse = {
        major: major,
        minor: minor,
        revision: revision
    };
    
    return getMainApplicationVersionResponse;
}

export interface IGetMainApplicationVersionResponse {
    readonly major: number;
    readonly minor: number;
    readonly revision: number;
}
