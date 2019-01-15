export interface IKeyValuePair {
    readonly key: string;
    readonly value: any;
}

// https://www.dustinhorne.com/post/2016/06/09/implementing-a-dictionary-in-typescript
export interface IGenericKeyValuePair<K, V> {
    readonly key: K;
    readonly value: V;
}

export interface IApiMessage {
    readonly flags: number;

    readonly targetId: number;
    readonly sourceId: number;

    readonly deviceId: number;
    readonly deviceName: string;
    readonly commandId: number;
    readonly commandName: string;

    readonly sequenceNumber: number;

    readonly dataRawBytes: Array<number>;
    readonly requestRawBytes: Array<number>;
    readonly responseRawBytes: Array<number>;

    readonly data: object | null;
    readonly error: string | null;
    readonly isAck: boolean;
}
