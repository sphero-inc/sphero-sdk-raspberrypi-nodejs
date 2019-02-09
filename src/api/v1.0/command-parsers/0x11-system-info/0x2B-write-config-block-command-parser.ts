// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseWriteConfigBlockResponse(dataRawBytes: Array<number>): IWriteConfigBlockResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'isSuccess' | Type: 'bool' | Size: 1
	let isSuccessBytes: Array<number> = ByteConversionUtilities.getBoolBytes(dataRawBytes, currentIndex);
	let isSuccess: boolean = ByteConversionUtilities.byteArrayToBool(isSuccessBytes);
	currentIndex += isSuccessBytes.length;
	
	let writeConfigBlockResponse: IWriteConfigBlockResponse = {
		isSuccess: isSuccess
	};
	
	return writeConfigBlockResponse;
}

export interface IWriteConfigBlockResponse {
	readonly isSuccess: boolean;
}
