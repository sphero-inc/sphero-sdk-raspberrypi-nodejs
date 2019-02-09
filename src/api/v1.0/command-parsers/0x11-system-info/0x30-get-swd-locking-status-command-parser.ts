// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetSwdLockingStatusResponse(dataRawBytes: Array<number>): IGetSwdLockingStatusResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'isLocked' | Type: 'bool' | Size: 1
	let isLockedBytes: Array<number> = ByteConversionUtilities.getBoolBytes(dataRawBytes, currentIndex);
	let isLocked: boolean = ByteConversionUtilities.byteArrayToBool(isLockedBytes);
	currentIndex += isLockedBytes.length;
	
	let getSwdLockingStatusResponse: IGetSwdLockingStatusResponse = {
		isLocked: isLocked
	};
	
	return getSwdLockingStatusResponse;
}

export interface IGetSwdLockingStatusResponse {
	readonly isLocked: boolean;
}
