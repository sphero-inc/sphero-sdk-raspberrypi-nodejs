// internal imports
import {IApiCommandMessage} from '../models/api-command-message';
import {buildApiResponseMessage, IApiResponseMessage} from '../models/api-response-message';
import {ApiDalBase, ApiDalTypes, IApiDal} from './api-dal-interface';


class ApiDalMock extends ApiDalBase {
    public socketSend: (message: string) => void;
    
    public get type(): ApiDalTypes {
        return ApiDalTypes.Mock;
    }

    constructor() {
        super();
    }

    protected sendApiCommandMessageInternal(apiCommandMessage: IApiCommandMessage): Promise<IApiResponseMessage> {
        // return buildApiResponseMessage();
        throw new Error('');
    }
}

let _mockApiDal: ApiDalMock | null = null;
export function buildMockApiDal(): IApiDal {
    if (_mockApiDal == null) {
        _mockApiDal = new ApiDalMock();
    }

    return _mockApiDal;
}
