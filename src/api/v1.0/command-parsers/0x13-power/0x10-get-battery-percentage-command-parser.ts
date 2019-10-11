// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBatteryPercentageResponse(dataRawBytes: Array<number>): IGetBatteryPercentageResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'percentage' | Type: 'uint8_t' | Size: 1
    let percentageBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let percentage: number = ByteConversionUtilities.byteArrayToInt8(percentageBytes);
    currentIndex += percentageBytes.length;
    
    let getBatteryPercentageResponse: IGetBatteryPercentageResponse = {
        percentage: percentage
    };
    
    return getBatteryPercentageResponse;
}

export interface IGetBatteryPercentageResponse {
    readonly percentage: number;
}
