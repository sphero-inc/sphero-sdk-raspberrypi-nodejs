// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetTestFixtureResultRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'testId' | Type: 'uint16_t' | Size: 1
	let testId: number = requestBody.testId;
	let testIdBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(testId).reverse();
	dataRawBytes.concat(testIdBytes);
	
	return dataRawBytes;
}

export function parseGetTestFixtureResultResponse(dataRawBytes: Array<number>): IGetTestFixtureResultResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'fixtureId' | Type: 'uint16_t' | Size: 1
	let fixtureIdBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
	let fixtureId: number = ByteConversionUtilities.byteArrayToInt16(fixtureIdBytes.reverse());
	currentIndex += fixtureIdBytes.length;
	
	// Index: 1 | Name: 'results' | Type: 'uint32_t' | Size: 1
	let resultsBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
	let results: number = ByteConversionUtilities.byteArrayToInt32(resultsBytes.reverse());
	currentIndex += resultsBytes.length;
	
	let getTestFixtureResultResponse: IGetTestFixtureResultResponse = {
		fixtureId: fixtureId,
		results: results
	};
	
	return getTestFixtureResultResponse;
}

export interface IGetTestFixtureResultResponse {
	readonly fixtureId: number;
	readonly results: number;
}
