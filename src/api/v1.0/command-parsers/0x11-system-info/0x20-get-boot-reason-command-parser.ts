// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBootReasonResponse(dataRawBytes: Array<number>): IGetBootReasonResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'reason' | Type: 'uint8_t' | Size: 1
	let reasonBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let reason: number = ByteConversionUtilities.byteArrayToInt8(reasonBytes);
	currentIndex += reasonBytes.length;
	
	let getBootReasonResponse: IGetBootReasonResponse = {
		reason: reason
	};
	
	return getBootReasonResponse;
}

export interface IGetBootReasonResponse {
	readonly reason: number;
}
