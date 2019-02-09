// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetEulerAnglesResponse(dataRawBytes: Array<number>): IGetEulerAnglesResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'pitch' | Type: 'float' | Size: 1
	let pitchBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
	let pitch: number = ByteConversionUtilities.byteArrayToFloat(pitchBytes.reverse());
	currentIndex += pitchBytes.length;
	
	// Index: 1 | Name: 'roll' | Type: 'float' | Size: 1
	let rollBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
	let roll: number = ByteConversionUtilities.byteArrayToFloat(rollBytes.reverse());
	currentIndex += rollBytes.length;
	
	// Index: 2 | Name: 'extendedRoll' | Type: 'float' | Size: 1
	let extendedRollBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
	let extendedRoll: number = ByteConversionUtilities.byteArrayToFloat(extendedRollBytes.reverse());
	currentIndex += extendedRollBytes.length;
	
	// Index: 3 | Name: 'yaw' | Type: 'float' | Size: 1
	let yawBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
	let yaw: number = ByteConversionUtilities.byteArrayToFloat(yawBytes.reverse());
	currentIndex += yawBytes.length;
	
	let getEulerAnglesResponse: IGetEulerAnglesResponse = {
		pitch: pitch,
		roll: roll,
		extendedRoll: extendedRoll,
		yaw: yaw
	};
	
	return getEulerAnglesResponse;
}

export interface IGetEulerAnglesResponse {
	readonly pitch: number;
	readonly roll: number;
	readonly extendedRoll: number;
	readonly yaw: number;
}
