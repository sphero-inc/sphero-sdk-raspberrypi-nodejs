// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetAllLedsRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'ledGroup' | Type: 'uint16_t' (BITMASK) | Size: 1
	let ledGroup: number = requestBody.ledGroup;
	let ledGroupBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(ledGroup);
	dataRawBytes.concat(ledGroupBytes);
	
	// Index: 1 | Name: 'ledBrightnessValues' | Type: 'uint8_t' | Size: 16
	for (let i: number = 0; i < requestBody.ledBrightnessValues.length && i < 16; i++) {
		let ledBrightnessValues: number = requestBody.ledBrightnessValues[i];
		let ledBrightnessValuesBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(ledBrightnessValues);
		dataRawBytes.concat(ledBrightnessValuesBytes);
	}
	
	return dataRawBytes;
}
