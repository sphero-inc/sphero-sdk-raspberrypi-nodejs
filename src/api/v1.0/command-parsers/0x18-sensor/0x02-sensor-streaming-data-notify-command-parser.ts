// internal imports
import {ByteConversionUtilities} from '../../../../utilities/byte-conversion-utilities'


export function parseSensorStreamingDataNotify(dataRawBytes: Array<number>): Array<number> {
    let currentIndex: number = 0;

    let parsedData: Array<number> = [];

    // Index: 0 | Name: 'sensorData' | Type: 'float' | Size: 255
    let sensorDataValues: Array<number> = []
    for (let i: number = 0; i < 255; i++) {
        if (currentIndex >= dataRawBytes.length) {
            break;
        }

        let sensorDataBytes: Array<number> = ByteConversionUtilities.getFloatBytes(dataRawBytes, currentIndex);
        let sensorData: number = ByteConversionUtilities.byteArrayToFloat(sensorDataBytes.reverse());
        currentIndex += sensorDataBytes.length;
        parsedData.push(sensorData);
        sensorDataValues.push(sensorData);
    }

    return parsedData;

}
