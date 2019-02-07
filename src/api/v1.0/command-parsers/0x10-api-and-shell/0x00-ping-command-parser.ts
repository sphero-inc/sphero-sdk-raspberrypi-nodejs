// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parsePingRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'data' | Type: 'uint8_t' | Size: 16 | IS_OPTIONAL
	for (let i: number = 0; i < requestBody.data.length && i < 16; i++) {
		let data: number = requestBody.data[i];
		let dataBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(data);
		dataRawBytes.concat(dataBytes);
	}
	
	return dataRawBytes;
}

export function parsePingResponse(dataRawBytes: Array<number>): IPingResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'data' | Type: 'uint8_t' | Size: 16
	let dataValues: Array<number> = []
	for (let i: number = 0; i < 16; i++) {
		if (currentIndex >= dataRawBytes.length) {
			break;
		}
		
		let dataBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
		let data: number = ByteConversionUtilities.byteArrayToInt8(dataBytes);
		currentIndex += dataBytes.length;
		dataValues.push(data);
	}
	
	let pingResponse: IPingResponse = {
		data: dataValues
	};
	
	return pingResponse;
}

export interface IPingResponse {
	readonly data: Array<number>;
}
