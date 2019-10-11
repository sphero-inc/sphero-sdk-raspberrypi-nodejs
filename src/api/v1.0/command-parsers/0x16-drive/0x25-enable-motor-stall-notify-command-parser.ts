// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseEnableMotorStallNotifyRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'isEnabled' | Type: 'bool' | Size: 1
    let isEnabled: boolean = requestBody.isEnabled;
    let isEnabledBytes: Array<number> = ByteConversionUtilities.boolToByteArray(isEnabled);
    dataRawBytes = dataRawBytes.concat(isEnabledBytes);
    
    return dataRawBytes;
}
