// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetFactoryModeStatusResponse(dataRawBytes: Array<number>): IGetFactoryModeStatusResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'factoryStatus' | Type: 'bool' | Size: 1
	let factoryStatusBytes: Array<number> = ByteConversionUtilities.getBoolBytes(dataRawBytes, currentIndex);
	let factoryStatus: boolean = ByteConversionUtilities.byteArrayToBool(factoryStatusBytes);
	currentIndex += factoryStatusBytes.length;
	
	let getFactoryModeStatusResponse: IGetFactoryModeStatusResponse = {
		factoryStatus: factoryStatus
	};
	
	return getFactoryModeStatusResponse;
}

export interface IGetFactoryModeStatusResponse {
	readonly factoryStatus: boolean;
}
