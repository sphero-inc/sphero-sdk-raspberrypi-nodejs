// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetMotorTemperatureRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'motorIndex' | Type: 'uint8_t' (ENUM) | Size: 1
    let motorIndex: number = requestBody.motorIndex;
    let motorIndexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(motorIndex);
    dataRawBytes = dataRawBytes.concat(motorIndexBytes);
    
    return dataRawBytes;
}

export function parseGetMotorTemperatureResponse(dataRawBytes: Array<number>): IGetMotorTemperatureResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'windingCoilTemperature' | Type: 'float' | Size: 1
    let windingCoilTemperatureBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let windingCoilTemperature: number = ByteConversionUtilities.byteArrayToFloat(windingCoilTemperatureBytes.reverse());
    currentIndex += windingCoilTemperatureBytes.length;
    
    // Index: 1 | Name: 'caseTemperature' | Type: 'float' | Size: 1
    let caseTemperatureBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let caseTemperature: number = ByteConversionUtilities.byteArrayToFloat(caseTemperatureBytes.reverse());
    currentIndex += caseTemperatureBytes.length;
    
    let getMotorTemperatureResponse: IGetMotorTemperatureResponse = {
        windingCoilTemperature: windingCoilTemperature,
        caseTemperature: caseTemperature
    };
    
    return getMotorTemperatureResponse;
}

export interface IGetMotorTemperatureResponse {
    readonly windingCoilTemperature: number;
    readonly caseTemperature: number;
}
