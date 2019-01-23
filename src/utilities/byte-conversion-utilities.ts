
export class ByteConversionUtilities {
    public static int32ToByteArray(value: number): Array<number> {
        let bytes: Array<number> = [0, 0, 0, 0];

        if (value == undefined || value == null) {
            return bytes;
        }

        for (let i: number = 0; i < bytes.length; i++) {
            let byte: number = value & 0xFF;
            bytes[i] = byte;
            value = (value - byte) / 256;
        }

        return bytes;
    }

    public static int16ToByteArray(value: number): Array<number> {
        let bytes: Array<number> = [0, 0];

        if (value == undefined || value == null) {
            return bytes;
        }

        for (let i: number = 0; i < bytes.length; i++) {
            let byte: number = value & 0xFF;
            bytes[i] = byte;
            value = (value - byte) / 256;
        }

        return bytes;
    }

    public static floatToByteArray(value: number): Array<number> {
        if (value == undefined || value == null) {
            return [];
        }

        let floatArray: Float32Array = new Float32Array(1);
        floatArray[0] = value;
        let uint8Array: Uint8Array = new Uint8Array(floatArray.buffer);

        let bytes: Array<number> = [];
        for (let i: number = 0; i < uint8Array.byteLength; i++) {
            bytes.push(uint8Array[i]);
        }

        return bytes;
    }

    public static stringToByteArray(value: string): Array<number> {
        let bytes: Array<number> = [];

        if (value == undefined || value == null) {
            return bytes;
        }

        for (let i = 0; i < value.length; i++) {
            bytes.push(value.charCodeAt(i));
        }

        return bytes;
    }

    public static byteArrayToNumber(bytes: Array<number>): number {
        let value: number = 0;

        if (!bytes) {
            return value;
        }

        for (let i: number = bytes.length - 1; i >= 0; i--) {
            value = (value * 256) + bytes[i];
        }

        return value;
    }

    public static byteArrayToFloat(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        let byteArray: Uint8Array = new Uint8Array(bytes);
        let floatArray: Float32Array = new Float32Array(byteArray.buffer);
        return floatArray[0];
    }

    public static incrementByteValue(byte: number, incrementBy: number): number {
        byte += incrementBy;
        if (byte >= 256) {
            byte = byte - 256;
        }

        return byte;
    }

    public static byteToNibbles(byte: number): Array<number> {
        let bytes: Array<number> = [0, 0];

        for (let j: number = 0; j < bytes.length; j++ ) {
            let tempByte: number = byte & 0x0f;
            bytes[j] = tempByte;
            byte = (byte - tempByte) / 16;
        }

        return bytes;
    }

    public static nibblesToByte(nibbles: Array<number>): number {
        let value: number = 0;

        if (!nibbles) {
            return value;
        }

        for (let i: number = nibbles.length - 1; i >= 0 ; i--) {
            value = (value * 16) + nibbles[i];
        }

        return value;
    }

    public static convertNumberToHexString(value: number): string {
        let hexValue = value.toString(16);

        if (hexValue.length == 1) {
            hexValue = '0' + hexValue;
        }

        return '0x' + hexValue.toUpperCase();
    }

    public static convertNumbersToHexCsvString(values: Array<number>): string {
        let hexValues: Array<string> = [];

        for (let i: number = 0; i < values.length; i++) {
            hexValues.push(this.convertNumberToHexString(values[i]));
        }

        return hexValues.join(', ');
    }
}
