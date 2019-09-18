// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetProcessorNameResponse(dataRawBytes: Array<number>): IGetProcessorNameResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'name' | Type: 'std::string' | Size: 1
    let nameBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
    let name: string = ByteConversionUtilities.byteArrayToString(nameBytes);
    currentIndex += nameBytes.length;
    
    let getProcessorNameResponse: IGetProcessorNameResponse = {
        name: name
    };
    
    return getProcessorNameResponse;
}

export interface IGetProcessorNameResponse {
    readonly name: string;
}
