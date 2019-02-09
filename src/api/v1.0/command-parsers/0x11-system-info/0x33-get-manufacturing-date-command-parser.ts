// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetManufacturingDateResponse(dataRawBytes: Array<number>): IGetManufacturingDateResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'year' | Type: 'uint16_t' | Size: 1
	let yearBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
	let year: number = ByteConversionUtilities.byteArrayToInt16(yearBytes.reverse());
	currentIndex += yearBytes.length;
	
	// Index: 1 | Name: 'month' | Type: 'uint8_t' | Size: 1
	let monthBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let month: number = ByteConversionUtilities.byteArrayToInt8(monthBytes);
	currentIndex += monthBytes.length;
	
	// Index: 2 | Name: 'day' | Type: 'uint8_t' | Size: 1
	let dayBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let day: number = ByteConversionUtilities.byteArrayToInt8(dayBytes);
	currentIndex += dayBytes.length;
	
	let getManufacturingDateResponse: IGetManufacturingDateResponse = {
		year: year,
		month: month,
		day: day
	};
	
	return getManufacturingDateResponse;
}

export interface IGetManufacturingDateResponse {
	readonly year: number;
	readonly month: number;
	readonly day: number;
}
