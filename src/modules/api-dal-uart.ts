// internal imports
import {IApiCommandMessage} from '../models/api-command-message';
import {buildApiResponseMessage, IApiResponseMessage} from '../models/api-response-message';
import {ApiDalBase, ApiDalTypes, IApiDal} from './api-dal-interface';


class ApiDalUart extends ApiDalBase {
    public get type(): ApiDalTypes {
        return ApiDalTypes.UART;
    }

    constructor() {
        super();
    }

    protected sendApiCommandMessageInternal(apiMessage: IApiCommandMessage): IApiResponseMessage {
        // return buildApiResponseMessage();
        throw new Error('');
    }
}

let _uartApiDal: ApiDalBase | null = null;
export function buildUartApiDal(): IApiDal {
    if (_uartApiDal == null) {
        _uartApiDal = new ApiDalUart();
    }

    return _uartApiDal;
}
