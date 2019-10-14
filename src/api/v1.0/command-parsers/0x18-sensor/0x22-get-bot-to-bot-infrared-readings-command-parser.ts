// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBotToBotInfraredReadingsResponse(dataRawBytes: Array<number>): IGetBotToBotInfraredReadingsResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'sensorData' | Type: 'uint32_t' (BITMASK) | Size: 1
    let sensorDataBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
    let sensorData: number = ByteConversionUtilities.byteArrayToInt32(sensorDataBytes.reverse());
    currentIndex += sensorDataBytes.length;
    
    let getBotToBotInfraredReadingsResponse: IGetBotToBotInfraredReadingsResponse = {
        sensorData: sensorData
    };
    
    return getBotToBotInfraredReadingsResponse;
}

export interface IGetBotToBotInfraredReadingsResponse {
    readonly sensorData: number;
}
