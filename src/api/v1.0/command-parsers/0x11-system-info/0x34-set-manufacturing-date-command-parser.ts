// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetManufacturingDateRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'year' | Type: 'uint16_t' | Size: 1
	let year: number = requestBody.year;
	let yearBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(year).reverse();
	dataRawBytes.concat(yearBytes);
	
	// Index: 1 | Name: 'month' | Type: 'uint8_t' | Size: 1
	let month: number = requestBody.month;
	let monthBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(month);
	dataRawBytes.concat(monthBytes);
	
	// Index: 2 | Name: 'day' | Type: 'uint8_t' | Size: 1
	let day: number = requestBody.day;
	let dayBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(day);
	dataRawBytes.concat(dayBytes);
	
	return dataRawBytes;
}
