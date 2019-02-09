// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseTankDriveRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'leftSpeed' | Type: 'uint8_t' | Size: 1
	let leftSpeed: number = requestBody.leftSpeed;
	let leftSpeedBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(leftSpeed);
	dataRawBytes.concat(leftSpeedBytes);
	
	// Index: 1 | Name: 'rightSpeed' | Type: 'uint8_t' | Size: 1
	let rightSpeed: number = requestBody.rightSpeed;
	let rightSpeedBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(rightSpeed);
	dataRawBytes.concat(rightSpeedBytes);
	
	// Index: 2 | Name: 'flags' | Type: 'uint8_t' (BITMASK) | Size: 1
	let flags: number = requestBody.flags;
	let flagsBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(flags);
	dataRawBytes.concat(flagsBytes);
	
	return dataRawBytes;
}
