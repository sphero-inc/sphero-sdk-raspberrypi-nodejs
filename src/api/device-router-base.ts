// internal imports
import {IDeviceRouter} from './router-interfaces';
import {RouterBase} from './router-base';
import {IGenericKeyValuePair} from '../models/key-value-pair';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';
import {ApiParserFactory, IApiParser} from '../modules/api-parser';
import {isStringNullOrWhitespace} from '../utilities/string-utilities'


export abstract class DeviceRouterBase extends RouterBase implements IDeviceRouter {
    private readonly _deviceId: number;

    protected readonly _apiParser: IApiParser;

    protected readonly _commandIds: Array<number>;
    protected readonly _commandNameById: Array<IGenericKeyValuePair<number, string>>;

    public get deviceId(): number {
        return this._deviceId;
    }

    protected constructor(name: string, apiDal: IApiDal, configuration: IConfiguration, deviceId: number) {
        super(name, apiDal, configuration);

        this._apiParser = ApiParserFactory.getApiParser();

        this._deviceId = deviceId;

        this._commandIds = [];
        this._commandNameById = [];
    }

    protected registerCommand(id: number, name: string): void {
        if (isStringNullOrWhitespace(name)) {
            throw new Error('Command name is required!');
        }

        if (this._commandIds.indexOf(id) > 0)  {
            this._logger.warning('Route \'' + name + '\' (' + String(id) + ') is already registered!');

            return;
        }

        this._commandIds.push(id);
        this._commandNameById.push({key: id, value: name});

        this._logger.debug('Route \'' + name + '\' (' + ByteConversionUtilities.convertNumberToHexString(id) + ') registered successfully!');
    }

    protected getCommandName(id: number): string {
        for (let i = 0; i < this._commandNameById.length; i++) {
            let commandKeyValuePair: IGenericKeyValuePair<number, string> = this._commandNameById[i];

            if (commandKeyValuePair.key == id) {
                return commandKeyValuePair.value;
            }
        }

        // this should never happen if the command was registered
        throw new Error('Command name was not found!');
    }

    protected logRequest(route: string, method: string, toyPrefix: string, deviceId: number, deviceName: string, commandId: number, commandName: string, sourceId: number, targetId: number, requestJsonPayload: string = '') {
        this.routeExecuted('Request',
            route, method, toyPrefix,
            deviceId, deviceName,
            commandId, commandName,
            sourceId, targetId,
            requestJsonPayload);
    }
    protected logResponse(route: string, method: string, toyPrefix: string, deviceId: number, deviceName: string, commandId: number, commandName: string, sourceId: number, targetId: number, responseJsonPayload: string = '') {
        this.routeExecuted('Response',
            route, method, toyPrefix,
            deviceId, deviceName,
            commandId, commandName,
            sourceId, targetId,
            responseJsonPayload);
    }
    private routeExecuted(messagePrefix: string, route: string, method: string, toyPrefix: string, deviceId: number, deviceName: string, commandId: number, commandName: string, sourceId: number, targetId: number, jsonPayload: string = '') {
        this._logger.info(`${messagePrefix} -- Route: ${route} | Method: ${method}`);
        this._logger.debug(`${messagePrefix} -- Route: ${route} | Method: ${method} | ToyPrefix: ${toyPrefix} | Device: ${deviceName} (${deviceId}) | Command: ${commandName} (${commandId}) | SourceId: ${sourceId} | TargetId: ${targetId} | Payload: ${jsonPayload}`);
    }
    protected routeError(route: string, method: string, errorCode: number, errorDetail: string) {
        this._logger.error(`Route Error -- Route: ${route} | Method: ${method} | ErrorCode: ${errorCode} | ErrorDetail: ${errorDetail}`);
    }
}
