// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetEventLogStatusResponse(dataRawBytes: Array<number>): IGetEventLogStatusResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'logCapacity' | Type: 'uint32_t' | Size: 1
    let logCapacityBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
    let logCapacity: number = ByteConversionUtilities.byteArrayToInt32(logCapacityBytes.reverse());
    currentIndex += logCapacityBytes.length;
    
    // Index: 1 | Name: 'numberOfBytesUsed' | Type: 'uint32_t' | Size: 1
    let numberOfBytesUsedBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
    let numberOfBytesUsed: number = ByteConversionUtilities.byteArrayToInt32(numberOfBytesUsedBytes.reverse());
    currentIndex += numberOfBytesUsedBytes.length;
    
    // Index: 2 | Name: 'numberOfEventsInLog' | Type: 'uint32_t' | Size: 1
    let numberOfEventsInLogBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
    let numberOfEventsInLog: number = ByteConversionUtilities.byteArrayToInt32(numberOfEventsInLogBytes.reverse());
    currentIndex += numberOfEventsInLogBytes.length;
    
    let getEventLogStatusResponse: IGetEventLogStatusResponse = {
        logCapacity: logCapacity,
        numberOfBytesUsed: numberOfBytesUsed,
        numberOfEventsInLog: numberOfEventsInLog
    };
    
    return getEventLogStatusResponse;
}

export interface IGetEventLogStatusResponse {
    readonly logCapacity: number;
    readonly numberOfBytesUsed: number;
    readonly numberOfEventsInLog: number;
}
