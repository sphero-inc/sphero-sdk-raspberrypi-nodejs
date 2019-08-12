// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSensorStreamingDataNotifyResponse(dataRawBytes: Array<number>): Array<number> {

    let bytesPerData: number = 4;
    let currentIndex: number = 0;

    let parsedData : Array<number> = [];

    for(let currentIndex = 0; currentIndex < dataRawBytes.length; currentIndex += bytesPerData){
        let currentIndexBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
        let data: number = ByteConversionUtilities.byteArrayToFloat(currentIndexBytes.reverse());
        parsedData.push(data);
    }
    return parsedData;
}

