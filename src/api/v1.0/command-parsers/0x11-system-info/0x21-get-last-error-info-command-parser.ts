// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetLastErrorInfoResponse(dataRawBytes: Array<number>): IGetLastErrorInfoResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'fileName' | Type: 'uint8_t' | Size: 32
    let fileNameValues: Array<number> = []
    for (let i: number = 0; i < 32; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let fileNameBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let fileName: number = ByteConversionUtilities.byteArrayToInt8(fileNameBytes);
        currentIndex += fileNameBytes.length;
        fileNameValues.push(fileName);
    }
    
    // Index: 1 | Name: 'lineNumber' | Type: 'uint16_t' | Size: 1
    let lineNumberBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let lineNumber: number = ByteConversionUtilities.byteArrayToInt16(lineNumberBytes.reverse());
    currentIndex += lineNumberBytes.length;
    
    // Index: 2 | Name: 'data' | Type: 'uint8_t' | Size: 12
    let dataValues: Array<number> = []
    for (let i: number = 0; i < 12; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let dataBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let data: number = ByteConversionUtilities.byteArrayToInt8(dataBytes);
        currentIndex += dataBytes.length;
        dataValues.push(data);
    }
    
    let getLastErrorInfoResponse: IGetLastErrorInfoResponse = {
        fileName: fileNameValues,
        lineNumber: lineNumber,
        data: dataValues
    };
    
    return getLastErrorInfoResponse;
}

export interface IGetLastErrorInfoResponse {
    readonly fileName: Array<number>;
    readonly lineNumber: number;
    readonly data: Array<number>;
}
