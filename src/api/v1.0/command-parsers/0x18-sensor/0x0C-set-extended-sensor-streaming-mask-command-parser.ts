// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetExtendedSensorStreamingMaskRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'dataMask' | Type: 'uint32_t' | Size: 1
	let dataMask: number = requestBody.dataMask;
	let dataMaskBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(dataMask).reverse();
	dataRawBytes = dataRawBytes.concat(dataMaskBytes);
	
	return dataRawBytes;
}
