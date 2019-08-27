// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSendStringToConsoleResponse(dataRawBytes: Array<number>): ISendStringToConsoleResponse {
	let currentIndex: number = 0;

	// Index: 0 | Name: 'consoleString' | Type: 'std::string' | Size: 1
	let consoleStringBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
	let consoleString: string = ByteConversionUtilities.byteArrayToString(consoleStringBytes);
	currentIndex += consoleStringBytes.length;

	let sendStringToConsoleResponse: ISendStringToConsoleResponse = {
		consoleString: consoleString
	};

	return sendStringToConsoleResponse;
}

export interface ISendStringToConsoleResponse {
	readonly consoleString: string;
}
