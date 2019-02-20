// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetPlayModeRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'identifier' | Type: 'uint16_t' | Size: 1
	let identifier: number = requestBody.identifier;
	let identifierBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(identifier).reverse();
	dataRawBytes = dataRawBytes.concat(identifierBytes);
	
	return dataRawBytes;
}
