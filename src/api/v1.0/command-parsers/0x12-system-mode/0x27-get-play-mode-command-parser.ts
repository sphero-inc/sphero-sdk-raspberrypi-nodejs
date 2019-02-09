// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetPlayModeResponse(dataRawBytes: Array<number>): IGetPlayModeResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'identifier' | Type: 'uint16_t' | Size: 1
	let identifierBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
	let identifier: number = ByteConversionUtilities.byteArrayToInt16(identifierBytes.reverse());
	currentIndex += identifierBytes.length;
	
	let getPlayModeResponse: IGetPlayModeResponse = {
		identifier: identifier
	};
	
	return getPlayModeResponse;
}

export interface IGetPlayModeResponse {
	readonly identifier: number;
}
