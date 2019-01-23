// internal imports
import {IDeviceRouter} from './router-interfaces';
import {RouterBase} from './router-base';
import {IGenericKeyValuePair} from '../models/key-value-pair';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {IConfiguration} from '../configuration';

export abstract class DeviceRouterBase extends RouterBase implements IDeviceRouter {
    private readonly _deviceId: number;

    protected readonly _commandIds: Array<number>;
    protected readonly _commandNameById: Array<IGenericKeyValuePair<number, string>>;

    public get deviceId(): number {
        return this._deviceId;
    }

    protected constructor(name: string, configuration: IConfiguration, deviceId: number) {
        super(name, configuration);

        this._deviceId = deviceId;

        this._commandIds = [];
        this._commandNameById = [];
    }

    protected registerCommand(id: number, name: string): void {
        if (this._commandIds.indexOf(id) > 0)  {
            this._logger.warning('Route \'' + name + '\' (' + String(id) + ') is already registered!');
            return;
        }

        this._commandIds.push(id);
        this._commandNameById.push({key: id, value: name});

        this._logger.info('Route \'' + name + '\' (' + ByteConversionUtilities.convertNumberToHexString(id) + ') registered successfully!');
    }

    protected getCommandName(id: number): string | null {
        for (let i = 0; i < this._commandNameById.length; i++) {
            let commandKeyValuePair: IGenericKeyValuePair<number, string> = this._commandNameById[i];

            if (commandKeyValuePair.key == id) {
                return commandKeyValuePair.value;
            }
        }

        return null;
    }

    protected routeExecuted(route: string, method: string, toyPrefix: string, did: number, cid: number, targetId: number, name: string, jsonBody: string = '') {
        // TODO: finish this
        this._logger.info(`Route: ${route}`);
    }
}
