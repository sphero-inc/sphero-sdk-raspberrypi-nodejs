// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetTestFixtureResultRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'testId' | Type: 'uint16_t' | Size: 1
	let testId: number = requestBody.testId;
	let testIdBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(testId).reverse();
	dataRawBytes = dataRawBytes.concat(testIdBytes);
	
	// Index: 1 | Name: 'fixtureId' | Type: 'uint16_t' | Size: 1
	let fixtureId: number = requestBody.fixtureId;
	let fixtureIdBytes: Array<number> = ByteConversionUtilities.int16ToByteArray(fixtureId).reverse();
	dataRawBytes = dataRawBytes.concat(fixtureIdBytes);
	
	// Index: 2 | Name: 'results' | Type: 'uint32_t' | Size: 1
	let results: number = requestBody.results;
	let resultsBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(results).reverse();
	dataRawBytes = dataRawBytes.concat(resultsBytes);
	
	return dataRawBytes;
}
