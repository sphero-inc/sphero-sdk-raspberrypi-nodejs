// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetStatsIdResponse(dataRawBytes: Array<number>): IGetStatsIdResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'statsId' | Type: 'uint16_t' | Size: 1
	let statsIdBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
	let statsId: number = ByteConversionUtilities.byteArrayToInt16(statsIdBytes.reverse());
	currentIndex += statsIdBytes.length;
	
	let getStatsIdResponse: IGetStatsIdResponse = {
		statsId: statsId
	};
	
	return getStatsIdResponse;
}

export interface IGetStatsIdResponse {
	readonly statsId: number;
}
