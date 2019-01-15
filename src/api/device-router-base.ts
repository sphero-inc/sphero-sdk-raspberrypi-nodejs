// internal imports
import {IDeviceRouter} from './router-interfaces';
import {RouterBase} from './router-base';
import {IGenericKeyValuePair} from '../models/model-interfaces';

export abstract class DeviceRouterBase extends RouterBase implements IDeviceRouter {
    private readonly _deviceId: number;

    protected readonly _commandIds: Array<number>;
    protected readonly _commandNameById: Array<IGenericKeyValuePair<number, string>>;

    public get deviceId(): number {
        return this._deviceId;
    }

    protected constructor(name: string, deviceId: number) {
        super(name);

        this._deviceId = deviceId;

        this._commandIds = [];
        this._commandNameById = [];
    }

    protected registerCommand(id: number, name: string): void {
        if (this._commandIds.indexOf(id) > 0)  {
            // TODO: what to do here?
            return;
        }

        this._commandIds.push(id);
        this._commandNameById.push({key: id, value: name});
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
}
