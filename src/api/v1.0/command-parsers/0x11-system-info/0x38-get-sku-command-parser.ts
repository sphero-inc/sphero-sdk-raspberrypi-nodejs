// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetSkuResponse(dataRawBytes: Array<number>): IGetSkuResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'sku' | Type: 'std::string' | Size: 1
    let skuBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
    let sku: string = ByteConversionUtilities.byteArrayToString(skuBytes);
    currentIndex += skuBytes.length;
    
    let getSkuResponse: IGetSkuResponse = {
        sku: sku
    };
    
    return getSkuResponse;
}

export interface IGetSkuResponse {
    readonly sku: string;
}
