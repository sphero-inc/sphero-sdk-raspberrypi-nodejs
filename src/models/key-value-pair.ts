
// https://www.dustinhorne.com/post/2016/06/09/implementing-a-dictionary-in-typescript
export interface IGenericKeyValuePair<K, V> {
    readonly key: K;
    readonly value: V;
}

export interface IKeyValuePair extends IGenericKeyValuePair<string, any> {
    readonly key: string;
    readonly value: any;
}
