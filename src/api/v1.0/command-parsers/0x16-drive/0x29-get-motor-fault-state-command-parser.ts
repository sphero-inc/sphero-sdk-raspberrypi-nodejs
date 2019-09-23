// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetMotorFaultStateResponse(dataRawBytes: Array<number>): IGetMotorFaultStateResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'isFault' | Type: 'bool' | Size: 1
    let isFaultBytes: Array<number> = ByteConversionUtilities.getBoolBytes(dataRawBytes, currentIndex);
    let isFault: boolean = ByteConversionUtilities.byteArrayToBool(isFaultBytes);
    currentIndex += isFaultBytes.length;
    
    let getMotorFaultStateResponse: IGetMotorFaultStateResponse = {
        isFault: isFault
    };
    
    return getMotorFaultStateResponse;
}

export interface IGetMotorFaultStateResponse {
    readonly isFault: boolean;
}
