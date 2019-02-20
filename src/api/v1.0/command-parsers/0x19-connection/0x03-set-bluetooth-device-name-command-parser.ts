// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSetBluetoothDeviceNameRequest(requestBody: any): Array<number> {
	let dataRawBytes: Array<number> = [];
	
	// Index: 0 | Name: 'name' | Type: 'std::string' | Size: 1
	let name: string = requestBody.name;
	let nameBytes: Array<number> = ByteConversionUtilities.stringToByteArray(name);
	dataRawBytes = dataRawBytes.concat(nameBytes);
	
	return dataRawBytes;
}
