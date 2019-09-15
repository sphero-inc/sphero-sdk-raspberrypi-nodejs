// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseGetAmbientLightSensorValueResponse(dataRawBytes: Array<number>): IGetAmbientLightSensorValueResponse {
    let currentIndex: number = 0;
    
    // Index: 0 | Name: 'ambientLightValue' | Type: 'float' | Size: 1
    let ambientLightValueBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
    let ambientLightValue: number = ByteConversionUtilities.byteArrayToFloat(ambientLightValueBytes.reverse());
    currentIndex += ambientLightValueBytes.length;
    
    let getAmbientLightSensorValueResponse: IGetAmbientLightSensorValueResponse = {
        ambientLightValue: ambientLightValue
    };
    
    return getAmbientLightSensorValueResponse;
}

export interface IGetAmbientLightSensorValueResponse {
    readonly ambientLightValue: number;
}
