// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetConfigBlockRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'metaDataVersion' | Type: 'uint32_t' | Size: 1
	let metaDataVersion: number = requestBody.metaDataVersion;
	let metaDataVersionBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(metaDataVersion).reverse();
	dataRawBytes = dataRawBytes.concat(metaDataVersionBytes);
	
	// Index: 1 | Name: 'configBlockVersion' | Type: 'uint32_t' | Size: 1
	let configBlockVersion: number = requestBody.configBlockVersion;
	let configBlockVersionBytes: Array<number> = ByteConversionUtilities.int32ToByteArray(configBlockVersion).reverse();
	dataRawBytes = dataRawBytes.concat(configBlockVersionBytes);
	
	// Index: 2 | Name: 'applicationData' | Type: 'uint8_t' | Size: 255
	for (let i: number = 0; i < requestBody.applicationData.length && i < 255; i++) {
		let applicationData: number = requestBody.applicationData[i];
		let applicationDataBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(applicationData);
		dataRawBytes = dataRawBytes.concat(applicationDataBytes);
	}
	
	return dataRawBytes;
}
