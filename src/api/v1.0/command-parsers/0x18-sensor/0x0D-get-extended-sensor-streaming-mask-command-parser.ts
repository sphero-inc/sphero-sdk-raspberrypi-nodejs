// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetExtendedSensorStreamingMaskResponse(dataRawBytes: Array<number>): IGetExtendedSensorStreamingMaskResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'dataMask' | Type: 'uint32_t' | Size: 1
	let dataMaskBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
	let dataMask: number = ByteConversionUtilities.byteArrayToInt32(dataMaskBytes.reverse());
	currentIndex += dataMaskBytes.length;
	
	let getExtendedSensorStreamingMaskResponse: IGetExtendedSensorStreamingMaskResponse = {
		dataMask: dataMask
	};
	
	return getExtendedSensorStreamingMaskResponse;
}

export interface IGetExtendedSensorStreamingMaskResponse {
	readonly dataMask: number;
}
