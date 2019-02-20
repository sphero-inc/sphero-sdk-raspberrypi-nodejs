// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetSwdLockingRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'isLocked' | Type: 'bool' | Size: 1
	let isLocked: boolean = requestBody.isLocked;
	let isLockedBytes: Array<number> = ByteConversionUtilities.boolToByteArray(isLocked);
	dataRawBytes = dataRawBytes.concat(isLockedBytes);
	
	// Index: 1 | Name: 'unlockingKey' | Type: 'uint32_t' | Size: 1
	let unlockingKey: number = requestBody.unlockingKey;
	let unlockingKeyBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(unlockingKey).reverse();
	dataRawBytes = dataRawBytes.concat(unlockingKeyBytes);
	
	return dataRawBytes;
}
