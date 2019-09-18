// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseRobotToRobotInfraredMessageReceivedNotifyResponse(dataRawBytes: Array<number>): IRobotToRobotInfraredMessageReceivedNotifyResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'infraredCode' | Type: 'uint8_t' | Size: 1
    let infraredCodeBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
    let infraredCode: number = ByteConversionUtilities.byteArrayToInt8(infraredCodeBytes);
    currentIndex += infraredCodeBytes.length;
    
    let robotToRobotInfraredMessageReceivedNotifyResponse: IRobotToRobotInfraredMessageReceivedNotifyResponse = {
        infraredCode: infraredCode
    };
    
    return robotToRobotInfraredMessageReceivedNotifyResponse;
}

export interface IRobotToRobotInfraredMessageReceivedNotifyResponse {
    readonly infraredCode: number;
}
