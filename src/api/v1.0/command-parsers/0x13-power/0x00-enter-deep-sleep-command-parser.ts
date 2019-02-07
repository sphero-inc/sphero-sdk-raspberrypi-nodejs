// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseEnterDeepSleepRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'secondsUntilDeepSleep' | Type: 'uint8_t' | Size: 1 | Units: seconds
	let secondsUntilDeepSleep: number = requestBody.secondsUntilDeepSleep;
	let secondsUntilDeepSleepBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(secondsUntilDeepSleep);
	dataRawBytes.concat(secondsUntilDeepSleepBytes);
	
	return dataRawBytes;
}
