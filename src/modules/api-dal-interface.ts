// internal imports
import {IApiCommandMessage} from '../models/api-command-message'
import {IApiResponseMessage} from '../models/api-response-message'
import {IApiMessageLite} from '../models/api-message-lite';
import {ICommandParserHandler} from './command-parser-factory';


export enum ApiDalTypes {
    Uart,
    Mock
}

export interface IApiMessageNotificationObserver {
    apiCommandMessageReceivedNotification(apiCommandMessage: IApiCommandMessage): void; // TODO: eventually this needs to return an IApiResponseMessage
}

export interface IApiDal {
    readonly type: ApiDalTypes;

    sendApiCommandMessage(apiCommandMessage: IApiCommandMessage): Promise<IApiResponseMessage>;

    registerApiMessageNotificationObserver(apiMessageNotificationObserver: IApiMessageNotificationObserver): void;

    sendCommandToClientHandler: (message: IApiMessageLite) => void;

    getCommandParserHandler: (deviceId: number, commandId: number) => ICommandParserHandler | null;
}

export abstract class ApiDalBase implements IApiDal {
    private readonly _apiMessageNotificationObservers: Array<IApiMessageNotificationObserver> = [];

    public abstract get type(): ApiDalTypes;

    protected constructor() {
        // do nothing...
    }

    public async sendApiCommandMessage(apiMessage: IApiCommandMessage): Promise<IApiResponseMessage> {
        return await this.sendApiCommandMessageInternal(apiMessage);
    }

    protected abstract sendApiCommandMessageInternal(apiCommandMessage: IApiCommandMessage): Promise<IApiResponseMessage>;

    public registerApiMessageNotificationObserver(apiMessageNotificationObserver: IApiMessageNotificationObserver): void {
        this._apiMessageNotificationObservers.push(apiMessageNotificationObserver);
    }

    protected invokeReceivedApiCommandMessageCallback(apiCommandMessage: IApiCommandMessage): void {
        for (let i = 0; i < this._apiMessageNotificationObservers.length; i++) {
            this._apiMessageNotificationObservers[i].apiCommandMessageReceivedNotification(apiCommandMessage);
        }
    }

    public sendCommandToClientHandler: (message: IApiMessageLite) => void;

    public getCommandParserHandler: (deviceId: number, commandId: number) => ICommandParserHandler | null;
}
