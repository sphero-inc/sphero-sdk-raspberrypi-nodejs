// internal imports
import {defaultLogger as logger} from './modules/logger';


export interface IConfiguration {
    readonly applicationTitle: string;

    readonly address: string;
    readonly port: number;
    readonly fullAddress: string;

    initialize(address: string, port: number): void;
}


class Configuration implements IConfiguration {
    private _isInitialized: boolean = false;

    private readonly _applicationTitle: string = '';

    private _address: string = '';
    private _port: number = 0;

    public get applicationTitle(): string {
        return this._applicationTitle;
    }

    public get address(): string {
        return this._address;
    }
    public get port(): number {
        return this._port;
    }

    public get fullAddress(): string {
        return this._address + ':' + String(this._port);
    }

    constructor() {
        this._applicationTitle = 'Sphero SDK API';

        this._address = '';
        this._port = 0;
    }

    public initialize(address: string, port: number): void {
        if (this._isInitialized) {
            logger.warning('Configuration has already been initialized!');
            return;
        }

        // TODO: validate args

        this._address = address;
        this._port = port;

        this._isInitialized = true;
    }
}

export let defaultConfiguration: IConfiguration = new Configuration();
