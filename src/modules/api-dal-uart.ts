// external imports
import * as SerialPort from 'serialport';   // https://github.com/node-serialport/node-serialport

// internal imports
import {IApiCommandMessage} from '../models/api-command-message';
import {IApiResponseMessage} from '../models/api-response-message';
import {ApiDalBase, ApiDalTypes, IApiDal} from './api-dal-interface';
import {createLogger, ILogger} from './logger';
import {ApiParserFactory, IApiParser} from './api-parser';
import {IApiMessage} from '../models/api-message';
import {DeferredPromise} from '../models/deferred-promise';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities';
import {ApiProtocolErrorCodes} from '../constants';


let logger: ILogger = createLogger('api-dal-uart');


class ApiDalUart extends ApiDalBase {
    private readonly _apiParser: IApiParser;
    private readonly _serialPort: SerialPort;
    private readonly _apiCommandPendingResponseMap: Map<string, DeferredPromise<IApiResponseMessage>>;

    public get type(): ApiDalTypes {
        return ApiDalTypes.Uart;
    }

    constructor(path: string, baudRate: number) {
        super();

        logger.debug('Starting');
        return;

        this._apiParser = ApiParserFactory.getApiParser();
        this._apiParser.apiMessageParsedCallback = this.onApiMessageParsed;
        this._apiParser.apiProtocolErrorCallback = this.onApiProtocolError;

        this._serialPort = new SerialPort(path, {
            autoOpen: false,
            baudRate: baudRate
        });

        this._serialPort.on('open', this.onOpen);
        this._serialPort.on('close', this.onClose);
        this._serialPort.on('data', this.onDataReceived);
        this._serialPort.on('drain', this.onDrain);
        this._serialPort.on('error', this.onError);

        this._apiCommandPendingResponseMap = new Map<string, DeferredPromise<IApiResponseMessage>>();

        this._serialPort.open(error => {
            logger.error(`An error occurred while opening Serial Port: '${error}'`);
        });

        // TODO: do we need these?
        // this._serialPort.close(error => {
        //
        // });
        // this._serialPort.drain(error => {
        //
        // });
    }

    private onApiMessageParsed(apiMessage: IApiMessage): void {
        logger.debug(`API Message parsed: ${apiMessage.prettyPrint()}`);

        let mapKey: string = this.getApiMessageMapKey(apiMessage);
        if (!this._apiCommandPendingResponseMap.has(mapKey)) {
            // TODO: do what?
        }

        let responsePromise: DeferredPromise<IApiResponseMessage> | undefined = this._apiCommandPendingResponseMap.get(mapKey);
        if (responsePromise) {
            this._apiCommandPendingResponseMap.delete(mapKey);
            responsePromise.resolve(apiMessage);
        }

        // TODO: do what?

        // TODO: what about async messages to the socket?
    }
    private onApiProtocolError(errorCode: number): void {
        logger.error(`API Protocol Error: '${ApiProtocolErrorCodes.getApiProtocolErrorMessageFromCode(errorCode)}' (${errorCode})`);
    }

    private onOpen(): void {
        logger.debug('Serial Port opened');
    }
    private onClose(): void {
        logger.debug('Serial Port closed');
    }
    private onDataReceived(data: Array<number>): void {
        // var dataUTF8 = data.toString('utf-8');

        logger.debug(`Received bytes: ${ByteConversionUtilities.convertNumbersToHexCsvString(data)}`);

        this._apiParser.queueBytes(data);
    }
    private onDrain(): void {
        logger.debug('Serial Port drained');
    }
    private onError(error: Error): void {
        logger.error(`An error occurred on Serial Port: '${error}'`);
    }

    protected async sendApiCommandMessageInternal(apiCommandMessage: IApiCommandMessage): Promise<IApiResponseMessage> {
        let responsePromise: DeferredPromise<IApiResponseMessage> = new DeferredPromise<IApiResponseMessage>();
        let mapKey: string = this.getApiMessageMapKey(apiCommandMessage);

        this._apiCommandPendingResponseMap.set(mapKey, responsePromise);

        // TODO: do we need buffer the bytes in case we need to drain?

        let isWaitingForDrain: boolean = this._serialPort.write(apiCommandMessage.messageRawBytes, 'utf8', ((error, bytesWritten) => {
            // TODO: do something with this - log?
        }));

        // TODO: do we need to drain manually?

        return responsePromise.promise;
    }

    private getApiMessageMapKey(apiMessage: IApiMessage): string {
        return `${apiMessage.sequenceNumber}.${apiMessage.targetId}.${apiMessage.sourceId}.${apiMessage.deviceId}.${apiMessage.commandId}`
    }
}

let _uartApiDal: ApiDalUart | null = null;
export function buildUartApiDal(path: string, baudRate: number): IApiDal {
    if (_uartApiDal == null) {
        _uartApiDal = new ApiDalUart(path, baudRate);
    }

    return _uartApiDal;
}
