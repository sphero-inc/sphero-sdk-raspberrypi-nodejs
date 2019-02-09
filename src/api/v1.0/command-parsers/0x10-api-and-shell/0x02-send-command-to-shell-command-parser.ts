// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSendCommandToShellRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'shellCommandString' | Type: 'std::string' | Size: 1
	let shellCommandString: string = requestBody.shellCommandString;
	let shellCommandStringBytes: Array<number> = ByteConversionUtilities.stringToByteArray(shellCommandString);
	dataRawBytes.concat(shellCommandStringBytes);
	
	return dataRawBytes;
}
