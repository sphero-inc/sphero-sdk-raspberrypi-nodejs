// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBluetoothAdvertisingNameResponse(dataRawBytes: Array<number>): IGetBluetoothAdvertisingNameResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'name' | Type: 'std::string' | Size: 1
    let nameBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
    let name: string = ByteConversionUtilities.byteArrayToString(nameBytes);
    currentIndex += nameBytes.length;
    
    let getBluetoothAdvertisingNameResponse: IGetBluetoothAdvertisingNameResponse = {
        name: name
    };
    
    return getBluetoothAdvertisingNameResponse;
}

export interface IGetBluetoothAdvertisingNameResponse {
    readonly name: string;
}
