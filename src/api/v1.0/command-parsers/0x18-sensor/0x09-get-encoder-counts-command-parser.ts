// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetEncoderCountsResponse(dataRawBytes: Array<number>): IGetEncoderCountsResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'encoderCounts' | Type: 'int16_t' | Size: 2
	let encoderCountsValues: Array<number> = []
	for (let i: number = 0; i < 2; i++) {
		if (currentIndex >= dataRawBytes.length) {
			break;
		}
		
		let encoderCountsBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
		let encoderCounts: number = ByteConversionUtilities.byteArrayToInt16(encoderCountsBytes.reverse());
		encoderCounts = encoderCounts > ByteConversionUtilities.int16MaxValue ? encoderCounts - ByteConversionUtilities.uint16MaxValue : encoderCounts;
		currentIndex += encoderCountsBytes.length;
		encoderCountsValues.push(encoderCounts);
	}
	
	let getEncoderCountsResponse: IGetEncoderCountsResponse = {
		encoderCounts: encoderCountsValues
	};
	
	return getEncoderCountsResponse;
}

export interface IGetEncoderCountsResponse {
	readonly encoderCounts: Array<number>;
}
