// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetFactoryModeChallengeResponse(dataRawBytes: Array<number>): IGetFactoryModeChallengeResponse {
	let currentIndex: number = 0;
	
	// Index: 0 | Name: 'securityChallenge' | Type: 'uint32_t' | Size: 1
	let securityChallengeBytes: Array<number> = ByteConversionUtilities.getInt32Bytes(dataRawBytes, currentIndex);
	let securityChallenge: number = ByteConversionUtilities.byteArrayToInt32(securityChallengeBytes.reverse());
	currentIndex += securityChallengeBytes.length;
	
	let getFactoryModeChallengeResponse: IGetFactoryModeChallengeResponse = {
		securityChallenge: securityChallenge
	};
	
	return getFactoryModeChallengeResponse;
}

export interface IGetFactoryModeChallengeResponse {
	readonly securityChallenge: number;
}
