// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetRawMotorsRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'leftMode' | Type: 'uint8_t' (ENUM) | Size: 1
	let leftMode: number = requestBody.leftMode;
	let leftModeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(leftMode);
	dataRawBytes.concat(leftModeBytes);
	
	// Index: 1 | Name: 'leftSpeed' | Type: 'uint8_t' | Size: 1
	let leftSpeed: number = requestBody.leftSpeed;
	let leftSpeedBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(leftSpeed);
	dataRawBytes.concat(leftSpeedBytes);
	
	// Index: 2 | Name: 'rightMode' | Type: 'uint8_t' (ENUM) | Size: 1
	let rightMode: number = requestBody.rightMode;
	let rightModeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(rightMode);
	dataRawBytes.concat(rightModeBytes);
	
	// Index: 3 | Name: 'rightSpeed' | Type: 'uint8_t' | Size: 1
	let rightSpeed: number = requestBody.rightSpeed;
	let rightSpeedBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(rightSpeed);
	dataRawBytes.concat(rightSpeedBytes);
	
	return dataRawBytes;
}
