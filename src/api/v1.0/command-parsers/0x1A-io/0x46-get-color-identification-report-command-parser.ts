// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetColorIdentificationReportRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'red' | Type: 'uint8_t' | Size: 1
    let red: number = requestBody.red;
    let redBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(red);
    dataRawBytes = dataRawBytes.concat(redBytes);
    
    // Index: 1 | Name: 'green' | Type: 'uint8_t' | Size: 1
    let green: number = requestBody.green;
    let greenBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(green);
    dataRawBytes = dataRawBytes.concat(greenBytes);
    
    // Index: 2 | Name: 'blue' | Type: 'uint8_t' | Size: 1
    let blue: number = requestBody.blue;
    let blueBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(blue);
    dataRawBytes = dataRawBytes.concat(blueBytes);
    
    // Index: 3 | Name: 'confidenceThreshold' | Type: 'uint8_t' | Size: 1
    let confidenceThreshold: number = requestBody.confidenceThreshold;
    let confidenceThresholdBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(confidenceThreshold);
    dataRawBytes = dataRawBytes.concat(confidenceThresholdBytes);
    
    return dataRawBytes;
}

export function parseGetColorIdentificationReportResponse(dataRawBytes: Array<number>): IGetColorIdentificationReportResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'indexConfidenceByte' | Type: 'uint8_t' | Size: 24
    let indexConfidenceByteValues: Array<number> = []
    for (let i: number = 0; i < 24; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }
        
        let indexConfidenceByteBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
        let indexConfidenceByte: number = ByteConversionUtilities.byteArrayToInt8(indexConfidenceByteBytes);
        currentIndex += indexConfidenceByteBytes.length;
        indexConfidenceByteValues.push(indexConfidenceByte);
    }
    
    let getColorIdentificationReportResponse: IGetColorIdentificationReportResponse = {
        indexConfidenceByte: indexConfidenceByteValues
    };
    
    return getColorIdentificationReportResponse;
}

export interface IGetColorIdentificationReportResponse {
    readonly indexConfidenceByte: Array<number>;
}
