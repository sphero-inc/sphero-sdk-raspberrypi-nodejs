// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from "./router-base";
import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../models/api-command-message';
import {IApiResponseMessage} from '../models/api-response-message';
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {ApiTargetsAndSources} from '../constants';

export class GenericCommandRouter extends RouterBase {
    private static readonly _routeName: string = 'GenericCommand';

    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(GenericCommandRouter._routeName, apiDal, configuration);
        console.log("Constructing object/GenericCommandRouter");

    }

    protected initializeRoutes(): void {
        console.log("In initialize routers/GenericCommandRouter");
        this.router.route('/genericCommand')
            .put((request: Request, response: Response) => this.getBytesFromGeneric(request, response));
    }

    public getBytesFromGeneric(request: Request, response: Response) {

        if (!request.body) {
            let errorCode: number = 400;

            let errorDetail: string = 'Payload is required!';
            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        let sourceId: number = ApiTargetsAndSources.serviceSource;

        let targetId: number = request.body.targetId;
        let deviceId: number = request.body.deviceId;
        let commandId: number = request.body.commandId;

        let commandMessageParser = this._apiDal.getCommandMessageParser(deviceId, commandId);
        let dataRawBytes = null;
        if (commandMessageParser){
            dataRawBytes = commandMessageParser(request.body.data);
        }

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            deviceId, "", commandId, "",
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();

        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json(apiResponseMessage.messageRawBytes);

        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in sendGenericCommand while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }


}
