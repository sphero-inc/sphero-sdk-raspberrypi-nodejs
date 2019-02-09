// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseEnablePlayModeChangeNotifyResponse(dataRawBytes: Array<number>): IEnablePlayModeChangeNotifyResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'identifier' | Type: 'uint8_t' | Size: 1
	let identifierBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let identifier: number = ByteConversionUtilities.byteArrayToInt8(identifierBytes);
	currentIndex += identifierBytes.length;
	
	let enablePlayModeChangeNotifyResponse: IEnablePlayModeChangeNotifyResponse = {
		identifier: identifier
	};
	
	return enablePlayModeChangeNotifyResponse;
}

export interface IEnablePlayModeChangeNotifyResponse {
	readonly identifier: number;
}
