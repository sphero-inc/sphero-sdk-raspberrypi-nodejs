// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSendStringToConsole(dataRawBytes: Array<number>): string {
	let currentIndex: number = 0;

	// Index: 0 | Name: 'consoleString' | Type: 'std::string' | Size: 1
	let consoleStringBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
	let consoleString: string = ByteConversionUtilities.byteArrayToString(consoleStringBytes);
	console.log(consoleString);
	
	return consoleString;
	
}
