export class ByteConversionUtilities {
    public static numberToByteArray(value: number, size: number) {
        let bytes: Array<number> = [];

        for (let i: number = 0; i < size; i++) {
            bytes.push(0);
        }

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

    public static boolToByteArray(value: boolean): Array<number> {
        let bytes: Array<number> = [0];

        if (value == undefined || value == null) {
            return bytes;
        }

        bytes[0] = !value ? 0 : 1;

        return bytes;
    }

    public static int8ToByteArray(value: number): Array<number> {
        return this.numberToByteArray(value, 1);
    }

    public static int16ToByteArray(value: number): Array<number> {
        return this.numberToByteArray(value, 2);
    }

    public static int32ToByteArray(value: number): Array<number> {
        return this.numberToByteArray(value, 4);
    }

    public static int64ToByteArray(value: number): Array<number> {
        return this.numberToByteArray(value, 8);
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

    public static doubleToByteArray(value: number): Array<number> {
        if (value == undefined || value == null) {
            return [];
        }

        let floatArray: Float64Array = new Float64Array(1);
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

        if (value == undefined || value == null || value.length == 0) {
            return bytes;
        }

        // add null character
        if (value[value.length - 1] != '\0') {
            value += '\0';
        }

        for (let i: number = 0; i < value.length; i++) {
            bytes.push(value.charCodeAt(i));
        }

        return bytes;
    }

    public static sliceBytes(bytes: Array<number>, startingIndex: number, count: number): Array<number> {
        let slicedBytes: Array<number> = [];

        if (!bytes || bytes.length == 0) {
            return slicedBytes;
        }

        let endingIndex: number = startingIndex + count;    // this is an exclusive index
        if (endingIndex > bytes.length) {
            return slicedBytes;
        }

        return bytes.slice(startingIndex, endingIndex);
    }

    public static getBoolBytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 1);
    }

    public static getInt8Bytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 1);
    }

    public static getInt16Bytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 2);
    }

    public static getInt32Bytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 4);
    }

    public static getInt64Bytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 8);
    }

    public static getFloatBytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 4);
    }

    public static getDoubleBytes(bytes: Array<number>, currentIndex: number): Array<number> {
        return this.sliceBytes(bytes, currentIndex, 8);
    }

    public static getStringBytes(bytes: Array<number>, currentIndex: number): Array<number> {
        let slicedBytes: Array<number> = [];

        if (!bytes || bytes.length == 0) {
            return slicedBytes;
        }

        const nullTerminator: number = '\0'.charCodeAt(0);

        for (let i: number = currentIndex; i < bytes.length; i++) {
            let byte = bytes[i];

            if (byte == nullTerminator) {
                if (slicedBytes.length == 0) {
                    continue;
                }

                break;
            }

            slicedBytes.push(byte);
        }

        return slicedBytes;
    }

    public static byteArrayToNumber(bytes: Array<number>): number {
        let value: number = 0;

        if (!bytes || bytes.length == 0) {
            return value;
        }

        for (let i: number = bytes.length - 1; i >= 0; i--) {
            value = (value * 256) + bytes[i];
        }

        return value;
    }

    public static byteArrayToBool(bytes: Array<number>): boolean {
        if (!bytes) {
            return false;
        }

        if (bytes.length != 1) {
            return false;
        }

        return bytes[0] === 1 ? true : false;
    }

    public static byteArrayToInt8(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        if (bytes.length != 1) {
            return 0;
        }

        return this.byteArrayToNumber(bytes);
    }

    public static byteArrayToInt16(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        if (bytes.length != 2) {
            return 0;
        }

        return this.byteArrayToNumber(bytes);
    }

    public static byteArrayToInt32(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        if (bytes.length != 4) {
            return 0;
        }

        return this.byteArrayToNumber(bytes);
    }

    public static byteArrayToInt64(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        if (bytes.length != 8) {
            return 0;
        }

        return this.byteArrayToNumber(bytes);
    }

    public static byteArrayToFloat(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        if (bytes.length != 4) {
            return 0;
        }

        let byteArray: Uint8Array = new Uint8Array(bytes);
        let floatArray: Float32Array = new Float32Array(byteArray.buffer);
        return floatArray[0];
    }

    public static byteArrayToDouble(bytes: Array<number>): number {
        if (!bytes) {
            return 0;
        }

        if (bytes.length != 8) {
            return 0;
        }

        let byteArray: Uint8Array = new Uint8Array(bytes);
        let floatArray: Float64Array = new Float64Array(byteArray.buffer);
        return floatArray[0];
    }

    public static byteArrayToString(bytes: Array<number>): string {
        let text: string = '';

        if (!bytes || bytes.length == 0) {
            return text;
        }

        for (let i = 0; i < bytes.length; i++) {
            text = text + String.fromCharCode(bytes[i]);
        }

        // remove any null terminators
        text.replace(/\0/g, '');

        return text;
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

        for (let j: number = 0; j < bytes.length; j++) {
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
        if (value == undefined || value == null) {
            value = 0;
        }

        if (value < 0) {
            value = value + 256;
        }

        let hexValue: string = value.toString(16);

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

    public static clamp(value: number, minValue: number, maxValue: number): number {
        if (value == undefined || value == null) {
            return minValue;
        }

        if (value < minValue) {
            return minValue;
        }

        if (value > maxValue) {
            return maxValue;
        }

        return value;
    }

    public static clampByte(value: number): number {
        return this.clamp(value, 0, 255);
    }

    private static _uint8MinValue: number = 0;
    public static get uint8MinValue(): number {
        return this._uint8MinValue;
    }

    private static _uint8MaxValue: number = 255;
    public static get uint8MaxValue(): number {
        return this._uint8MaxValue;
    }

    private static _int8MinValue: number = -128;
    public static get int8MinValue(): number {
        return this._int8MinValue;
    }

    private static _int8MaxValue: number = 127;
    public static get int8MaxValue(): number {
        return this._int8MaxValue;
    }

    private static _uint16MinValue: number = 0;
    public static get uint16MinValue(): number {
        return this._uint16MinValue;
    }

    private static _uint16MaxValue: number = 65535;
    public static get uint16MaxValue(): number {
        return this._uint16MaxValue;
    }

    private static _int16MinValue: number = -32768;
    public static get int16MinValue(): number {
        return this._int16MinValue;
    }

    private static _int16MaxValue: number = 32767;
    public static get int16MaxValue(): number {
        return this._int16MaxValue;
    }

    private static _uint32MinValue: number = 0;
    public static get uint32MinValue(): number {
        return this._uint32MinValue;
    }

    private static _uint32MaxValue: number = 4294967295;
    public static get uint32MaxValue(): number {
        return this._uint32MaxValue;
    }

    private static _int32MinValue: number = -2147483648;
    public static get int32MinValue(): number {
        return this._int32MinValue;
    }

    private static _int32MaxValue: number = 2147483647;
    public static get int32MaxValue(): number {
        return this._int32MaxValue;
    }

    private static _uint64MinValue: number = 0;
    public static get uint64MinValue(): number {
        return this._uint64MinValue;
    }

    private static _uint64MaxValue: number = 18446744073709551615;
    public static get uint64MaxValue(): number {
        return this._uint64MaxValue;
    }

    private static _int64MinValue: number = -9223372036854775808;
    public static get int64MinValue(): number {
        return this._int64MinValue;
    }

    private static _int64MaxValue: number = 9223372036854775807;
    public static get int64MaxValue(): number {
        return this._int64MaxValue;
    }
}
