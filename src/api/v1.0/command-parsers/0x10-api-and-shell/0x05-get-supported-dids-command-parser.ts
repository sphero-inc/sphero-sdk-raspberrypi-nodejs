// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetSupportedDidsResponse(dataRawBytes: Array<number>): IGetSupportedDidsResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'dids' | Type: 'uint8_t' | Size: 9999
	let didsValues: Array<number> = []
	for (let i: number = 0; i < 9999; i++) {
		if (currentIndex >= dataRawBytes.length) {
			break;
		}
		
		let didsBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
		let dids: number = ByteConversionUtilities.byteArrayToInt8(didsBytes);
		currentIndex += didsBytes.length;
		didsValues.push(dids);
	}
	
	let getSupportedDidsResponse: IGetSupportedDidsResponse = {
		dids: didsValues
	};
	
	return getSupportedDidsResponse;
}

export interface IGetSupportedDidsResponse {
	readonly dids: Array<number>;
}
