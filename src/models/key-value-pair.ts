
export interface IKeyValuePair {
    readonly key: string;
    readonly value: any;
}

// https://www.dustinhorne.com/post/2016/06/09/implementing-a-dictionary-in-typescript
export interface IGenericKeyValuePair<K, V> {
    readonly key: K;
    readonly value: V;
}
