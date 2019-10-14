// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBatteryVoltageStateResponse(dataRawBytes: Array<number>): IGetBatteryVoltageStateResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'state' | Type: 'uint8_t' (ENUM) | Size: 1
    let stateBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let state: number = ByteConversionUtilities.byteArrayToInt8(stateBytes);
    currentIndex += stateBytes.length;
    
    let getBatteryVoltageStateResponse: IGetBatteryVoltageStateResponse = {
        state: state
    };
    
    return getBatteryVoltageStateResponse;
}

export interface IGetBatteryVoltageStateResponse {
    readonly state: number;
}
