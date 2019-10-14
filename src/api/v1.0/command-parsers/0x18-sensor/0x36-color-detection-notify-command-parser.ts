// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseColorDetectionNotifyResponse(dataRawBytes: Array<number>): IColorDetectionNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'red' | Type: 'uint8_t' | Size: 1
    let redBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let red: number = ByteConversionUtilities.byteArrayToInt8(redBytes);
    currentIndex += redBytes.length;
    
    // Index: 1 | Name: 'green' | Type: 'uint8_t' | Size: 1
    let greenBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let green: number = ByteConversionUtilities.byteArrayToInt8(greenBytes);
    currentIndex += greenBytes.length;
    
    // Index: 2 | Name: 'blue' | Type: 'uint8_t' | Size: 1
    let blueBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let blue: number = ByteConversionUtilities.byteArrayToInt8(blueBytes);
    currentIndex += blueBytes.length;
    
    // Index: 3 | Name: 'confidence' | Type: 'uint8_t' | Size: 1
    let confidenceBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let confidence: number = ByteConversionUtilities.byteArrayToInt8(confidenceBytes);
    currentIndex += confidenceBytes.length;
    
    // Index: 4 | Name: 'colorClassificationId' | Type: 'uint8_t' | Size: 1
    let colorClassificationIdBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let colorClassificationId: number = ByteConversionUtilities.byteArrayToInt8(colorClassificationIdBytes);
    currentIndex += colorClassificationIdBytes.length;
    
    let colorDetectionNotifyResponse: IColorDetectionNotifyResponse = {
        red: red,
        green: green,
        blue: blue,
        confidence: confidence,
        colorClassificationId: colorClassificationId
    };
    
    return colorDetectionNotifyResponse;
}

export interface IColorDetectionNotifyResponse {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly confidence: number;
    readonly colorClassificationId: number;
}
