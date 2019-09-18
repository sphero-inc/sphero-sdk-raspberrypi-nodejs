// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetRgbcSensorValuesResponse(dataRawBytes: Array<number>): IGetRgbcSensorValuesResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'redChannelValue' | Type: 'uint16_t' | Size: 1
    let redChannelValueBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let redChannelValue: number = ByteConversionUtilities.byteArrayToInt16(redChannelValueBytes.reverse());
    currentIndex += redChannelValueBytes.length;
    
    // Index: 1 | Name: 'greenChannelValue' | Type: 'uint16_t' | Size: 1
    let greenChannelValueBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let greenChannelValue: number = ByteConversionUtilities.byteArrayToInt16(greenChannelValueBytes.reverse());
    currentIndex += greenChannelValueBytes.length;
    
    // Index: 2 | Name: 'blueChannelValue' | Type: 'uint16_t' | Size: 1
    let blueChannelValueBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let blueChannelValue: number = ByteConversionUtilities.byteArrayToInt16(blueChannelValueBytes.reverse());
    currentIndex += blueChannelValueBytes.length;
    
    // Index: 3 | Name: 'clearChannelValue' | Type: 'uint16_t' | Size: 1
    let clearChannelValueBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
    let clearChannelValue: number = ByteConversionUtilities.byteArrayToInt16(clearChannelValueBytes.reverse());
    currentIndex += clearChannelValueBytes.length;
    
    let getRgbcSensorValuesResponse: IGetRgbcSensorValuesResponse = {
        redChannelValue: redChannelValue,
        greenChannelValue: greenChannelValue,
        blueChannelValue: blueChannelValue,
        clearChannelValue: clearChannelValue
    };
    
    return getRgbcSensorValuesResponse;
}

export interface IGetRgbcSensorValuesResponse {
    readonly redChannelValue: number;
    readonly greenChannelValue: number;
    readonly blueChannelValue: number;
    readonly clearChannelValue: number;
}
