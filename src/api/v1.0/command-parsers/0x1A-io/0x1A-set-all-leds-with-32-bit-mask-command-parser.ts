// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetAllLedsWith32BitMaskRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'ledGroup' | Type: 'uint32_t' (BITMASK) | Size: 1
	let ledGroup: number = requestBody.ledGroup;
	let ledGroupBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(ledGroup).reverse();
	dataRawBytes.concat(ledGroupBytes);
	
	// Index: 1 | Name: 'ledBrightnessValues' | Type: 'uint8_t' | Size: 32
	for (let i: number = 0; i < requestBody.ledBrightnessValues.length && i < 32; i++) {
		let ledBrightnessValues: number = requestBody.ledBrightnessValues[i];
		let ledBrightnessValuesBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(ledBrightnessValues);
		dataRawBytes.concat(ledBrightnessValuesBytes);
	}
	
	return dataRawBytes;
}
