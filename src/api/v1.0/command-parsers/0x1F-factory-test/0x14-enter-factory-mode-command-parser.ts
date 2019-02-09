// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseEnterFactoryModeRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'securityResponse' | Type: 'uint32_t' | Size: 1
	let securityResponse: number = requestBody.securityResponse;
	let securityResponseBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(securityResponse).reverse();
	dataRawBytes.concat(securityResponseBytes);
	
	return dataRawBytes;
}
