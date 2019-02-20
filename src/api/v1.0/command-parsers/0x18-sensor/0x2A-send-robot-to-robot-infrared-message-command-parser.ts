// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSendRobotToRobotInfraredMessageRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'infraredCode' | Type: 'uint8_t' | Size: 1
	let infraredCode: number = requestBody.infraredCode;
	let infraredCodeBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(infraredCode);
	dataRawBytes = dataRawBytes.concat(infraredCodeBytes);
	
	// Index: 1 | Name: 'frontLeftStrength' | Type: 'uint8_t' | Size: 1
	let frontLeftStrength: number = requestBody.frontLeftStrength;
	let frontLeftStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(frontLeftStrength);
	dataRawBytes = dataRawBytes.concat(frontLeftStrengthBytes);
	
	// Index: 2 | Name: 'frontRightStrength' | Type: 'uint8_t' | Size: 1
	let frontRightStrength: number = requestBody.frontRightStrength;
	let frontRightStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(frontRightStrength);
	dataRawBytes = dataRawBytes.concat(frontRightStrengthBytes);
	
	// Index: 3 | Name: 'backRightStrength' | Type: 'uint8_t' | Size: 1
	let backRightStrength: number = requestBody.backRightStrength;
	let backRightStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(backRightStrength);
	dataRawBytes = dataRawBytes.concat(backRightStrengthBytes);
	
	// Index: 4 | Name: 'backLeftStrength' | Type: 'uint8_t' | Size: 1
	let backLeftStrength: number = requestBody.backLeftStrength;
	let backLeftStrengthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(backLeftStrength);
	dataRawBytes = dataRawBytes.concat(backLeftStrengthBytes);
	
	return dataRawBytes;
}
