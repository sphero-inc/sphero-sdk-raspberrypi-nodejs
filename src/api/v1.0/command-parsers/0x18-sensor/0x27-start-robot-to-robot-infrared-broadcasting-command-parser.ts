// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseStartRobotToRobotInfraredBroadcastingRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'farCode' | Type: 'uint8_t' | Size: 1
	let farCode: number = requestBody.farCode;
	let farCodeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(farCode);
	dataRawBytes = dataRawBytes.concat(farCodeBytes);
	
	// Index: 1 | Name: 'nearCode' | Type: 'uint8_t' | Size: 1
	let nearCode: number = requestBody.nearCode;
	let nearCodeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(nearCode);
	dataRawBytes = dataRawBytes.concat(nearCodeBytes);
	
	return dataRawBytes;
}
