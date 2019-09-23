// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseMotorFaultNotifyResponse(dataRawBytes: Array<number>): IMotorFaultNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'isFault' | Type: 'bool' | Size: 1
    let isFaultBytes: Array<number> = ByteConversionUtilities.getBoolBytes(dataRawBytes, currentIndex);
    let isFault: boolean = ByteConversionUtilities.byteArrayToBool(isFaultBytes);
    currentIndex += isFaultBytes.length;
    
    let motorFaultNotifyResponse: IMotorFaultNotifyResponse = {
        isFault: isFault
    };
    
    return motorFaultNotifyResponse;
}

export interface IMotorFaultNotifyResponse {
    readonly isFault: boolean;
}
