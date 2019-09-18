// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBluetoothDeviceNameResponse(dataRawBytes: Array<number>): IGetBluetoothDeviceNameResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'name' | Type: 'std::string' | Size: 1
    let nameBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
    let name: string = ByteConversionUtilities.byteArrayToString(nameBytes);
    currentIndex += nameBytes.length;
    
    let getBluetoothDeviceNameResponse: IGetBluetoothDeviceNameResponse = {
        name: name
    };
    
    return getBluetoothDeviceNameResponse;
}

export interface IGetBluetoothDeviceNameResponse {
    readonly name: string;
}
