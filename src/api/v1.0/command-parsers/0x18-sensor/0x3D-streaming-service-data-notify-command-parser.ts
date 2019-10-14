// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseStreamingServiceDataNotifyResponse(dataRawBytes: Array<number>): IStreamingServiceDataNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'token' | Type: 'uint8_t' | Size: 1
    let tokenBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let token: number = ByteConversionUtilities.byteArrayToInt8(tokenBytes);
    currentIndex += tokenBytes.length;
    
    // Index: 1 | Name: 'sensorData' | Type: 'uint8_t' | Size: 9999
    let sensorDataValues: Array<number> = []
    for (let i: number = 0; i < 9999; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let sensorDataBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let sensorData: number = ByteConversionUtilities.byteArrayToInt8(sensorDataBytes);
        currentIndex += sensorDataBytes.length;
        sensorDataValues.push(sensorData);
    }
    
    let streamingServiceDataNotifyResponse: IStreamingServiceDataNotifyResponse = {
        token: token,
        sensorData: sensorDataValues
    };
    
    return streamingServiceDataNotifyResponse;
}

export interface IStreamingServiceDataNotifyResponse {
    readonly token: number;
    readonly sensorData: Array<number>;
}
