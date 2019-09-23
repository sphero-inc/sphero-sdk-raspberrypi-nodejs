// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseMotorThermalProtectionStatusNotifyResponse(dataRawBytes: Array<number>): IMotorThermalProtectionStatusNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'leftMotorTemperature' | Type: 'float' | Size: 1 | Units: celsius
    let leftMotorTemperatureBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let leftMotorTemperature: number = ByteConversionUtilities.byteArrayToFloat(leftMotorTemperatureBytes.reverse());
    currentIndex += leftMotorTemperatureBytes.length;
    
    // Index: 1 | Name: 'leftMotorStatus' | Type: 'uint8_t' (ENUM) | Size: 1
    let leftMotorStatusBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let leftMotorStatus: number = ByteConversionUtilities.byteArrayToInt8(leftMotorStatusBytes);
    currentIndex += leftMotorStatusBytes.length;
    
    // Index: 2 | Name: 'rightMotorTemperature' | Type: 'float' | Size: 1 | Units: celsius
    let rightMotorTemperatureBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let rightMotorTemperature: number = ByteConversionUtilities.byteArrayToFloat(rightMotorTemperatureBytes.reverse());
    currentIndex += rightMotorTemperatureBytes.length;
    
    // Index: 3 | Name: 'rightMotorStatus' | Type: 'uint8_t' (ENUM) | Size: 1
    let rightMotorStatusBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let rightMotorStatus: number = ByteConversionUtilities.byteArrayToInt8(rightMotorStatusBytes);
    currentIndex += rightMotorStatusBytes.length;
    
    let motorThermalProtectionStatusNotifyResponse: IMotorThermalProtectionStatusNotifyResponse = {
        leftMotorTemperature: leftMotorTemperature,
        leftMotorStatus: leftMotorStatus,
        rightMotorTemperature: rightMotorTemperature,
        rightMotorStatus: rightMotorStatus
    };
    
    return motorThermalProtectionStatusNotifyResponse;
}

export interface IMotorThermalProtectionStatusNotifyResponse {
    readonly leftMotorTemperature: number;
    readonly leftMotorStatus: number;
    readonly rightMotorTemperature: number;
    readonly rightMotorStatus: number;
}
