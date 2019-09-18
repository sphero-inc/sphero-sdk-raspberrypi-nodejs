// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetMacAddressResponse(dataRawBytes: Array<number>): IGetMacAddressResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'macAddress' | Type: 'std::string' | Size: 1
    let macAddressBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
    let macAddress: string = ByteConversionUtilities.byteArrayToString(macAddressBytes);
    currentIndex += macAddressBytes.length;
    
    let getMacAddressResponse: IGetMacAddressResponse = {
        macAddress: macAddress
    };
    
    return getMacAddressResponse;
}

export interface IGetMacAddressResponse {
    readonly macAddress: string;
}
