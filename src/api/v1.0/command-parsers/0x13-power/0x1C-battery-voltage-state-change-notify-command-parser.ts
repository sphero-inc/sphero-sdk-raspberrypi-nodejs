// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseBatteryVoltageStateChangeNotifyResponse(dataRawBytes: Array<number>): IBatteryVoltageStateChangeNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'state' | Type: 'uint8_t' (ENUM) | Size: 1
    let stateBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let state: number = ByteConversionUtilities.byteArrayToInt8(stateBytes);
    currentIndex += stateBytes.length;
    
    let batteryVoltageStateChangeNotifyResponse: IBatteryVoltageStateChangeNotifyResponse = {
        state: state
    };
    
    return batteryVoltageStateChangeNotifyResponse;
}

export interface IBatteryVoltageStateChangeNotifyResponse {
    readonly state: number;
}
