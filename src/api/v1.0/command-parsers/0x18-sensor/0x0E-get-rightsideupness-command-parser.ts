// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetRightsideupnessResponse(dataRawBytes: Array<number>): IGetRightsideupnessResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'rightsideupness' | Type: 'int8_t' | Size: 1
	let rightsideupnessBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let rightsideupness: number = ByteConversionUtilities.byteArrayToInt8(rightsideupnessBytes);
	rightsideupness = rightsideupness > ByteConversionUtilities.int8MaxValue ? rightsideupness - ByteConversionUtilities.uint8MaxValue : rightsideupness;
	currentIndex += rightsideupnessBytes.length;
	
	let getRightsideupnessResponse: IGetRightsideupnessResponse = {
		rightsideupness: rightsideupness
	};
	
	return getRightsideupnessResponse;
}

export interface IGetRightsideupnessResponse {
	readonly rightsideupness: number;
}
