// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSensitivityBasedCollisionDetectedNotifyResponse(dataRawBytes: Array<number>): ISensitivityBasedCollisionDetectedNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'time' | Type: 'uint64_t' | Size: 1
    let timeBytes: Array<number> = ByteConversionUtilities.getInt64Bytes(dataRawBytes, currentIndex);
    let time: number = ByteConversionUtilities.byteArrayToInt64(timeBytes.reverse());
    currentIndex += timeBytes.length;
    
    let sensitivityBasedCollisionDetectedNotifyResponse: ISensitivityBasedCollisionDetectedNotifyResponse = {
        time: time
    };
    
    return sensitivityBasedCollisionDetectedNotifyResponse;
}

export interface ISensitivityBasedCollisionDetectedNotifyResponse {
    readonly time: number;
}
