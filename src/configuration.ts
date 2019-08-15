// internal imports
import {createLogger, ILogger} from './modules/logger';


let logger: ILogger = createLogger('configuration');


export interface IConfiguration {
    readonly applicationTitle: string;

    readonly address: string;
    readonly port: number;
    readonly fullAddress: string;

    readonly webSocketPath: string;
    initialize(address: string, port: number): void;
}


class Configuration implements IConfiguration {
    private _isInitialized: boolean = false;


    private readonly _applicationTitle: string = '';
    public get applicationTitle(): string {
        return this._applicationTitle;
    }

    private _address: string = '';
    public get address(): string {
        return this._address;
    }

    private _port: number = 0;
    public get port(): number {
        return this._port;
    }

    private _webSocketPath: string = "/stream";
    public get webSocketPath(): string {
        return this._webSocketPath;
    }

    public get fullAddress(): string {
        return this._address + ':' + String(this._port);
    }

    constructor() {
        this._isInitialized = false;

        this._applicationTitle = 'Sphero SDK API';

        this._address = '';
        this._port = 0;
    }

    public initialize(address: string, port: number): void {
        if (this._isInitialized) {
            logger.warning('Configuration has already been initialized!');
            return;
        }

        logger.debug('Initializing Configuration');
        logger.debug(`Address: ${address}`);
        logger.debug(`Port: ${port}`);

        // TODO: validate args

        this._address = address;
        this._port = port;

        this._isInitialized = true;
    }
}

export let defaultConfiguration: IConfiguration = new Configuration();
