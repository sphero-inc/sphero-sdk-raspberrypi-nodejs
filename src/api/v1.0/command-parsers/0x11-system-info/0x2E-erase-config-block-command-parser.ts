// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseEraseConfigBlockRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'magicSafetyNumber' | Type: 'uint32_t' | Size: 1
	let magicSafetyNumber: number = requestBody.magicSafetyNumber;
	let magicSafetyNumberBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(magicSafetyNumber).reverse();
	dataRawBytes = dataRawBytes.concat(magicSafetyNumberBytes);
	
	return dataRawBytes;
}
