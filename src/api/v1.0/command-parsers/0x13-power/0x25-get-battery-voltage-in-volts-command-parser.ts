// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBatteryVoltageInVoltsRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'readingType' | Type: 'uint8_t' (ENUM) | Size: 1
    let readingType: number = requestBody.readingType;
    let readingTypeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(readingType);
    dataRawBytes = dataRawBytes.concat(readingTypeBytes);
    
    return dataRawBytes;
}

export function parseGetBatteryVoltageInVoltsResponse(dataRawBytes: Array<number>): IGetBatteryVoltageInVoltsResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'voltage' | Type: 'float' | Size: 1 | Units: volts
    let voltageBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let voltage: number = ByteConversionUtilities.byteArrayToFloat(voltageBytes.reverse());
    currentIndex += voltageBytes.length;
    
    let getBatteryVoltageInVoltsResponse: IGetBatteryVoltageInVoltsResponse = {
        voltage: voltage
    };
    
    return getBatteryVoltageInVoltsResponse;
}

export interface IGetBatteryVoltageInVoltsResponse {
    readonly voltage: number;
}
