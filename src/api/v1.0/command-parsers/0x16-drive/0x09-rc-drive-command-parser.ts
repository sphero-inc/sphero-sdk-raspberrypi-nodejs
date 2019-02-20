// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseRcDriveRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'speed' | Type: 'uint8_t' | Size: 1
	let speed: number = requestBody.speed;
	let speedBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(speed);
	dataRawBytes = dataRawBytes.concat(speedBytes);
	
	// Index: 1 | Name: 'turnRate' | Type: 'uint8_t' | Size: 1
	let turnRate: number = requestBody.turnRate;
	let turnRateBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(turnRate);
	dataRawBytes = dataRawBytes.concat(turnRateBytes);
	
	// Index: 2 | Name: 'flags' | Type: 'uint8_t' (BITMASK) | Size: 1
	let flags: number = requestBody.flags;
	let flagsBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(flags);
	dataRawBytes = dataRawBytes.concat(flagsBytes);
	
	return dataRawBytes;
}
