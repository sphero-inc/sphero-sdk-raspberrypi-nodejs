// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetNordicTemperatureResponse(dataRawBytes: Array<number>): IGetNordicTemperatureResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'temperature' | Type: 'int32_t' | Size: 2 | Units: nordic .25c st c | HAS_MODIFIER
	let temperatureValues: Array<number> = []
	for (let i: number = 0; i < 2; i++) {
		if (currentIndex >= dataRawBytes.length) {
			break;
		}
		
		let temperatureBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
		let temperature: number = ByteConversionUtilities.byteArrayToInt32(temperatureBytes.reverse());
		temperature = temperature > ByteConversionUtilities.int32MaxValue ? temperature - ByteConversionUtilities.uint32MaxValue : temperature;
		currentIndex += temperatureBytes.length;
		temperatureValues.push(temperature);
	}
	
	let getNordicTemperatureResponse: IGetNordicTemperatureResponse = {
		temperature: temperatureValues
	};
	
	return getNordicTemperatureResponse;
}

export interface IGetNordicTemperatureResponse {
	readonly temperature: Array<number>;
}
