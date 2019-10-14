// based on the implementation provided from https://romkevandermeulen.nl/2016/09/18/deferred-typescript.html


export class DeferredPromise<T> {
    private _fate: 'resolved' | 'unresolved';
    private _state: 'pending' | 'fulfilled' | 'rejected';

    private _resolve: Function;
    private _reject: Function;

    private readonly _promise: Promise<T>;
    public get promise(): Promise<T> {
        return this._promise;
    }

    public get isResolved() {
        return this._fate === 'resolved';
    }

    public get isPending() {
        return this._state === 'pending';
    }

    public get isFulfilled() {
        return this._state === 'fulfilled';
    }

    public get isRejected() {
        return this._state === 'rejected';
    }

    constructor() {
        this._fate = 'unresolved';
        this._state = 'pending';

        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });

        this.promise.then(
            () => this._state = 'fulfilled',
            () => this._state = 'rejected'
        );
    }

    public resolve(value?: any) {
        if (this.isResolved) {
            throw new Error('Promise is already resolved!');
        }

        this._fate = 'resolved';
        this._resolve(value);
    }

    public reject(reason?: any) {
        if (this.isResolved) {
            throw new Error('Promise is already resolved!');
        }

        this._fate = 'resolved';
        this._reject(reason);
    }
}
