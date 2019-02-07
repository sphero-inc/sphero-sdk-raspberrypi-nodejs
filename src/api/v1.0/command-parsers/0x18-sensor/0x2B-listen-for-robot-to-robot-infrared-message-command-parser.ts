// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseListenForRobotToRobotInfraredMessageRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'infraredCode' | Type: 'uint8_t' | Size: 1
	let infraredCode: number = requestBody.infraredCode;
	let infraredCodeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(infraredCode);
	dataRawBytes.concat(infraredCodeBytes);
	
	// Index: 1 | Name: 'listenDuration' | Type: 'uint32_t' | Size: 1
	let listenDuration: number = requestBody.listenDuration;
	let listenDurationBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(listenDuration);
	dataRawBytes.concat(listenDurationBytes);
	
	return dataRawBytes;
}
