// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseConfigureStreamingServiceRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'token' | Type: 'uint8_t' | Size: 1
    let token: number = requestBody.token;
    let tokenBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(token);
    dataRawBytes = dataRawBytes.concat(tokenBytes);
    
    // Index: 1 | Name: 'configuration' | Type: 'uint8_t' | Size: 15
    for (let i: number = 0; i < requestBody.configuration.length && i < 15; i++) {
        let configuration: number = requestBody.configuration[i];
        let configurationBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(configuration);
        dataRawBytes = dataRawBytes.concat(configurationBytes);
    }
    
    return dataRawBytes;
}
