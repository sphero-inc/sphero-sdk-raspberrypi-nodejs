// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseEnableColorDetectionNotifyRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'isEnabled' | Type: 'bool' | Size: 1
    let isEnabled: boolean = requestBody.isEnabled;
    let isEnabledBytes: Array<number> = ByteConversionUtilities.boolToByteArray(isEnabled);
    dataRawBytes = dataRawBytes.concat(isEnabledBytes);
    
    // Index: 1 | Name: 'interval' | Type: 'uint16_t' | Size: 1 | Units: milliseconds
    let interval: number = requestBody.interval;
    let intervalBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(interval).reverse();
    dataRawBytes = dataRawBytes.concat(intervalBytes);
    
    // Index: 2 | Name: 'minimumConfidenceThreshold' | Type: 'uint8_t' | Size: 1
    let minimumConfidenceThreshold: number = requestBody.minimumConfidenceThreshold;
    let minimumConfidenceThresholdBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(minimumConfidenceThreshold);
    dataRawBytes = dataRawBytes.concat(minimumConfidenceThresholdBytes);
    
    return dataRawBytes;
}
