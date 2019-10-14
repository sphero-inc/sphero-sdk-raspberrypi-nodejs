// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBatteryVoltageStateThresholdsResponse(dataRawBytes: Array<number>): IGetBatteryVoltageStateThresholdsResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'criticalThreshold' | Type: 'float' | Size: 1
    let criticalThresholdBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let criticalThreshold: number = ByteConversionUtilities.byteArrayToFloat(criticalThresholdBytes.reverse());
    currentIndex += criticalThresholdBytes.length;
    
    // Index: 1 | Name: 'lowThreshold' | Type: 'float' | Size: 1
    let lowThresholdBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let lowThreshold: number = ByteConversionUtilities.byteArrayToFloat(lowThresholdBytes.reverse());
    currentIndex += lowThresholdBytes.length;
    
    // Index: 2 | Name: 'hysteresis' | Type: 'float' | Size: 1
    let hysteresisBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let hysteresis: number = ByteConversionUtilities.byteArrayToFloat(hysteresisBytes.reverse());
    currentIndex += hysteresisBytes.length;
    
    let getBatteryVoltageStateThresholdsResponse: IGetBatteryVoltageStateThresholdsResponse = {
        criticalThreshold: criticalThreshold,
        lowThreshold: lowThreshold,
        hysteresis: hysteresis
    };
    
    return getBatteryVoltageStateThresholdsResponse;
}

export interface IGetBatteryVoltageStateThresholdsResponse {
    readonly criticalThreshold: number;
    readonly lowThreshold: number;
    readonly hysteresis: number;
}
