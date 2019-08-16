// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSensorStreamingDataNotifyResponse(dataRawBytes: Array<number>): ISensorStreamingDataNotifyResponse {
    let currentIndex: number = 0;

    // Index: 0 | Name: 'sensorData' | Type: 'float' | Size: 255
    let sensorDataValues: Array<number> = []
    for (let i: number = 0; i < 255; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }

        let sensorDataBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
        let sensorData: number = ByteConversionUtilities.byteArrayToFloat(sensorDataBytes.reverse());
        currentIndex += sensorDataBytes.length;
        sensorDataValues.push(sensorData);
    }

    let sensorStreamingDataNotifyResponse: ISensorStreamingDataNotifyResponse = {
        sensorData: sensorDataValues
    };

    return sensorStreamingDataNotifyResponse;
}

export interface ISensorStreamingDataNotifyResponse {
    readonly sensorData: Array<number>;
}
