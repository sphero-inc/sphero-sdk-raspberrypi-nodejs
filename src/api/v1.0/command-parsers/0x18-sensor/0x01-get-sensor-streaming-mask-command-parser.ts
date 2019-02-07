// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetSensorStreamingMaskResponse(dataRawBytes: Array<number>): IGetSensorStreamingMaskResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'interval' | Type: 'uint16_t' | Size: 1
	let intervalBytes: Array<number> = ByteConversionUtilities.getInt16Bytes(dataRawBytes, currentIndex);
	let interval: number = ByteConversionUtilities.byteArrayToInt16(intervalBytes.reverse());
	currentIndex += intervalBytes.length;
	
	// Index: 1 | Name: 'packetCount' | Type: 'uint8_t' | Size: 1
	let packetCountBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, currentIndex);
	let packetCount: number = ByteConversionUtilities.byteArrayToInt8(packetCountBytes);
	currentIndex += packetCountBytes.length;
	
	// Index: 2 | Name: 'dataMask' | Type: 'uint32_t' | Size: 1
	let dataMaskBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
	let dataMask: number = ByteConversionUtilities.byteArrayToInt32(dataMaskBytes.reverse());
	currentIndex += dataMaskBytes.length;
	
	let getSensorStreamingMaskResponse: IGetSensorStreamingMaskResponse = {
		interval: interval,
		packetCount: packetCount,
		dataMask: dataMask
	};
	
	return getSensorStreamingMaskResponse;
}

export interface IGetSensorStreamingMaskResponse {
	readonly interval: number;
	readonly packetCount: number;
	readonly dataMask: number;
}
