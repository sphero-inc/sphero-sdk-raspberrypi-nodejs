// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetConfigBlockResponse(dataRawBytes: Array<number>): IGetConfigBlockResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'metaDataVersion' | Type: 'uint32_t' | Size: 1
	let metaDataVersionBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
	let metaDataVersion: number = ByteConversionUtilities.byteArrayToInt32(metaDataVersionBytes.reverse());
	currentIndex += metaDataVersionBytes.length;
	
	// Index: 1 | Name: 'configBlockVersion' | Type: 'uint32_t' | Size: 1
	let configBlockVersionBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
	let configBlockVersion: number = ByteConversionUtilities.byteArrayToInt32(configBlockVersionBytes.reverse());
	currentIndex += configBlockVersionBytes.length;
	
	// Index: 2 | Name: 'applicationData' | Type: 'uint8_t' | Size: 255
	let applicationDataValues: Array<number> = []
	for (let i: number = 0; i < 255; i++) {
		if (currentIndex >= dataRawBytes.length) {
			break;
		}
		
		let applicationDataBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
		let applicationData: number = ByteConversionUtilities.byteArrayToInt8(applicationDataBytes);
		currentIndex += applicationDataBytes.length;
		applicationDataValues.push(applicationData);
	}
	
	let getConfigBlockResponse: IGetConfigBlockResponse = {
		metaDataVersion: metaDataVersion,
		configBlockVersion: configBlockVersion,
		applicationData: applicationDataValues
	};
	
	return getConfigBlockResponse;
}

export interface IGetConfigBlockResponse {
	readonly metaDataVersion: number;
	readonly configBlockVersion: number;
	readonly applicationData: Array<number>;
}
