// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetApiProtocolVersionResponse(dataRawBytes: Array<number>): IGetApiProtocolVersionResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'majorVersion' | Type: 'uint8_t' | Size: 1
	let majorVersionBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let majorVersion: number = ByteConversionUtilities.byteArrayToInt8(majorVersionBytes);
	currentIndex += majorVersionBytes.length;
	
	// Index: 1 | Name: 'minorVersion' | Type: 'uint8_t' | Size: 1
	let minorVersionBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let minorVersion: number = ByteConversionUtilities.byteArrayToInt8(minorVersionBytes);
	currentIndex += minorVersionBytes.length;
	
	let getApiProtocolVersionResponse: IGetApiProtocolVersionResponse = {
		majorVersion: majorVersion,
		minorVersion: minorVersion
	};
	
	return getApiProtocolVersionResponse;
}

export interface IGetApiProtocolVersionResponse {
	readonly majorVersion: number;
	readonly minorVersion: number;
}
