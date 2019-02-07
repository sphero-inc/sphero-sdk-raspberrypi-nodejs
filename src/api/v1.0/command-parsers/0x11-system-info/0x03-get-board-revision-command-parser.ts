// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBoardRevisionResponse(dataRawBytes: Array<number>): IGetBoardRevisionResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'revision' | Type: 'uint8_t' | Size: 1
	let revisionBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let revision: number = ByteConversionUtilities.byteArrayToInt8(revisionBytes);
	currentIndex += revisionBytes.length;
	
	let getBoardRevisionResponse: IGetBoardRevisionResponse = {
		revision: revision
	};
	
	return getBoardRevisionResponse;
}

export interface IGetBoardRevisionResponse {
	readonly revision: number;
}
