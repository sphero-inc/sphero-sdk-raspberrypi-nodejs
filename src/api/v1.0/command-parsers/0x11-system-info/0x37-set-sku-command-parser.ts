// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetSkuRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'sku' | Type: 'std::string' | Size: 1
	let sku: string = requestBody.sku;
	let skuBytes: Array<number> = ByteConversionUtilities.stringToByteArray(sku);
	dataRawBytes.concat(skuBytes);
	
	return dataRawBytes;
}
