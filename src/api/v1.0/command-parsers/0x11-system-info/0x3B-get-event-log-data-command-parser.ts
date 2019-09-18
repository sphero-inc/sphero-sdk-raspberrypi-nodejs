// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetEventLogDataRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'offset' | Type: 'uint32_t' | Size: 1
    let offset: number = requestBody.offset;
    let offsetBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(offset).reverse();
    dataRawBytes = dataRawBytes.concat(offsetBytes);
    
    // Index: 1 | Name: 'count' | Type: 'uint32_t' | Size: 1
    let count: number = requestBody.count;
    let countBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(count).reverse();
    dataRawBytes = dataRawBytes.concat(countBytes);
    
    return dataRawBytes;
}

export function parseGetEventLogDataResponse(dataRawBytes: Array<number>): IGetEventLogDataResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'logData' | Type: 'uint8_t' | Size: 9999
    let logDataValues: Array<number> = []
    for (let i: number = 0; i < 9999; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let logDataBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let logData: number = ByteConversionUtilities.byteArrayToInt8(logDataBytes);
        currentIndex += logDataBytes.length;
        logDataValues.push(logData);
    }
    
    let getEventLogDataResponse: IGetEventLogDataResponse = {
        logData: logDataValues
    };
    
    return getEventLogDataResponse;
}

export interface IGetEventLogDataResponse {
    readonly logData: Array<number>;
}
