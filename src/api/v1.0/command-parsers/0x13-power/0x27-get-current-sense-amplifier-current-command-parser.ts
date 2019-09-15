// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetCurrentSenseAmplifierCurrentRequest(requestBody: any): Array<number> {
    let dataRawBytes: Array<number> = [];
    
    // Index: 0 | Name: 'amplifierId' | Type: 'uint8_t' (ENUM) | Size: 1
    let amplifierId: number = requestBody.amplifierId;
    let amplifierIdBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(amplifierId);
    dataRawBytes = dataRawBytes.concat(amplifierIdBytes);
    
    return dataRawBytes;
}

export function parseGetCurrentSenseAmplifierCurrentResponse(dataRawBytes: Array<number>): IGetCurrentSenseAmplifierCurrentResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'amplifierCurrent' | Type: 'float' | Size: 1
    let amplifierCurrentBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let amplifierCurrent: number = ByteConversionUtilities.byteArrayToFloat(amplifierCurrentBytes.reverse());
    currentIndex += amplifierCurrentBytes.length;
    
    let getCurrentSenseAmplifierCurrentResponse: IGetCurrentSenseAmplifierCurrentResponse = {
        amplifierCurrent: amplifierCurrent
    };
    
    return getCurrentSenseAmplifierCurrentResponse;
}

export interface IGetCurrentSenseAmplifierCurrentResponse {
    readonly amplifierCurrent: number;
}
