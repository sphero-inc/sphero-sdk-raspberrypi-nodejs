// internal imports
import {createLogger, ILogger} from './modules/logger';
import {ApiDalTypes, IApiDal} from './modules/api-dal-interface';
import {buildMockApiDal} from './modules/api-dal-mock';
import {buildUartApiDal} from './modules/api-dal-uart';


let logger: ILogger = createLogger('configuration');


export interface IConfiguration {
    readonly applicationTitle: string;

    readonly address: string;
    readonly port: number;
    readonly fullAddress: string;

    readonly apiDal: IApiDal;

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

    public get fullAddress(): string {
        return this._address + ':' + String(this._port);
    }

    private readonly _apiDal: IApiDal;
    public get apiDal(): IApiDal {
        return this._apiDal;
    }

    constructor(apiDalType: ApiDalTypes = ApiDalTypes.Mock) {
        this._isInitialized = false;

        this._applicationTitle = 'Sphero SDK API';

        this._address = '';
        this._port = 0;

        this._apiDal = buildApiDal(apiDalType);
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

function buildApiDal(type: ApiDalTypes): IApiDal {
    let apiDal: IApiDal;

    switch (type) {
        case ApiDalTypes.UART:
            apiDal = buildUartApiDal();
            break;
        case ApiDalTypes.Mock:
        case ApiDalTypes.USB:
            apiDal = buildMockApiDal();
            break;
        default:
            apiDal = buildMockApiDal();
    }

    return apiDal;
}
