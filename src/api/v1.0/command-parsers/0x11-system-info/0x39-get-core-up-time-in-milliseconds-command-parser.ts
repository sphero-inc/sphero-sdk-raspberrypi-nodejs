// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetCoreUpTimeInMillisecondsResponse(dataRawBytes: Array<number>): IGetCoreUpTimeInMillisecondsResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'upTime' | Type: 'uint64_t' | Size: 1 | Units: milliseconds
    let upTimeBytes: Array<number> = ByteConversionUtilities.getInt64Bytes(dataRawBytes, currentIndex);
    let upTime: number = ByteConversionUtilities.byteArrayToInt64(upTimeBytes.reverse());
    currentIndex += upTimeBytes.length;
    
    let getCoreUpTimeInMillisecondsResponse: IGetCoreUpTimeInMillisecondsResponse = {
        upTime: upTime
    };
    
    return getCoreUpTimeInMillisecondsResponse;
}

export interface IGetCoreUpTimeInMillisecondsResponse {
    readonly upTime: number;
}
