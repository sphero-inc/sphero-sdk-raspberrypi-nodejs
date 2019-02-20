// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetSensorStreamingMaskRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'interval' | Type: 'uint16_t' | Size: 1
	let interval: number = requestBody.interval;
	let intervalBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(interval).reverse();
	dataRawBytes = dataRawBytes.concat(intervalBytes);
	
	// Index: 1 | Name: 'packetCount' | Type: 'uint8_t' | Size: 1
	let packetCount: number = requestBody.packetCount;
	let packetCountBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(packetCount);
	dataRawBytes = dataRawBytes.concat(packetCountBytes);
	
	// Index: 2 | Name: 'dataMask' | Type: 'uint32_t' | Size: 1
	let dataMask: number = requestBody.dataMask;
	let dataMaskBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(dataMask).reverse();
	dataRawBytes = dataRawBytes.concat(dataMaskBytes);
	
	return dataRawBytes;
}
