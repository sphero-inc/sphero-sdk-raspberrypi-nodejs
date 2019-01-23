// internal imports
import {IApiCommandMessage} from '../models/api-command-message'
import {IApiResponseMessage} from '../models/api-response-message'


export enum ApiDalTypes {
    UART,
    USB,
    Mock
}

export interface IApiDal {
    readonly type: ApiDalTypes;

    sendApiCommandMessage(apiMessage: IApiCommandMessage): IApiResponseMessage;
    receivedApiCommandMessageCallback: (apiMessage: IApiCommandMessage) => void; // TODO: do we allow multiple callback handlers?
}

export abstract class ApiDalBase implements IApiDal {
    public abstract get type(): ApiDalTypes;

    public receivedApiCommandMessageCallback: (apiMessage: IApiCommandMessage) => void;

    public sendApiCommandMessage(apiMessage: IApiCommandMessage): IApiResponseMessage {
        return this.sendApiCommandMessageInternal(apiMessage);
    }

    protected abstract sendApiCommandMessageInternal(apiMessage: IApiCommandMessage): IApiResponseMessage;

    protected invokeReceivedApiCommandMessageCallback(apiMessage: IApiCommandMessage): void {
        if (!this.receivedApiCommandMessageCallback) {
            return;
        }

        this.receivedApiCommandMessageCallback(apiMessage);
    }
}
