// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetMagnetometerChipIdResponse(dataRawBytes: Array<number>): IGetMagnetometerChipIdResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'chipId' | Type: 'uint8_t' | Size: 1
	let chipIdBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let chipId: number = ByteConversionUtilities.byteArrayToInt8(chipIdBytes);
	currentIndex += chipIdBytes.length;
	
	let getMagnetometerChipIdResponse: IGetMagnetometerChipIdResponse = {
		chipId: chipId
	};
	
	return getMagnetometerChipIdResponse;
}

export interface IGetMagnetometerChipIdResponse {
	readonly chipId: number;
}
