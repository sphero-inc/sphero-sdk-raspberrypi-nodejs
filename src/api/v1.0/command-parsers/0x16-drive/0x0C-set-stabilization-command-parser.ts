// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetStabilizationRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'index' | Type: 'uint8_t' (ENUM) | Size: 1
	let index: number = requestBody.index;
	let indexBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(index);
	dataRawBytes.concat(indexBytes);
	
	return dataRawBytes;
}
