// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetSupportedCidsRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'did' | Type: 'uint8_t' | Size: 1
	let did: number = requestBody.did;
	let didBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(did);
	dataRawBytes.concat(didBytes);
	
	return dataRawBytes;
}

export function parseGetSupportedCidsResponse(dataRawBytes: Array<number>): IGetSupportedCidsResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'cids' | Type: 'uint8_t' | Size: 9999
	let cidsValues: Array<number> = []
	for (let i: number = 0; i < 9999; i++) {
		if (currentIndex >= dataRawBytes.length) {
			break;
		}
		
		let cidsBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
		let cids: number = ByteConversionUtilities.byteArrayToInt8(cidsBytes);
		currentIndex += cidsBytes.length;
		cidsValues.push(cids);
	}
	
	let getSupportedCidsResponse: IGetSupportedCidsResponse = {
		cids: cidsValues
	};
	
	return getSupportedCidsResponse;
}

export interface IGetSupportedCidsResponse {
	readonly cids: Array<number>;
}
