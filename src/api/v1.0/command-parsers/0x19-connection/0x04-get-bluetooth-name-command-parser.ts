// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetBluetoothNameResponse(dataRawBytes: Array<number>): IGetBluetoothNameResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'name' | Type: 'std::string' | Size: 1
	let nameBytes: Array<number> = ByteConversionUtilities.getStringBytes(dataRawBytes, currentIndex);
	let name: string = ByteConversionUtilities.byteArrayToString(nameBytes);
	currentIndex += nameBytes.length;
	
	let getBluetoothNameResponse: IGetBluetoothNameResponse = {
		name: name
	};
	
	return getBluetoothNameResponse;
}

export interface IGetBluetoothNameResponse {
	readonly name: string;
}
