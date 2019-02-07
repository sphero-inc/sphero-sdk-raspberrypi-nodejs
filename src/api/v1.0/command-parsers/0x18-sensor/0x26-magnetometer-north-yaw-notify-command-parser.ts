// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseMagnetometerNorthYawNotifyResponse(dataRawBytes: Array<number>): IMagnetometerNorthYawNotifyResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'yawDirection' | Type: 'uint16_t' | Size: 1
	let yawDirectionBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
	let yawDirection: number = ByteConversionUtilities.byteArrayToInt16(yawDirectionBytes.reverse());
	currentIndex += yawDirectionBytes.length;
	
	let magnetometerNorthYawNotifyResponse: IMagnetometerNorthYawNotifyResponse = {
		yawDirection: yawDirection
	};
	
	return magnetometerNorthYawNotifyResponse;
}

export interface IMagnetometerNorthYawNotifyResponse {
	readonly yawDirection: number;
}
