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
import {getCommandMessageParser} from './utilities/command-parser-factory'

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



        let targetId: number = 2; // ByteConversionUtilities.nibblesToByte([1, parseInt(request.body.targetId)].reverse());
        let deviceId: number = 0x11; // ByteConversionUtilities.nibblesToByte([1, parseInt(request.body.deviceId)].reverse());
        let commandId: number = 0x00; // ByteConversionUtilities.nibblesToByte([1, parseInt(request.body.commandId)].reverse());
        let sourceId: number = ApiTargetsAndSources.serviceSource;


        let commandMessageParser = getCommandMessageParser(deviceId, commandId);
        console.log(commandMessageParser);
        console.log(request.body.data);
        console.log(JSON.parse(request.body.data));
        let dataRawBytes: Array<number> = commandMessageParser(JSON.parse(request.body.data));

        console.log(dataRawBytes);


        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            deviceId, "", commandId, "",
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();

        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json(apiResponseMessage.dataRawBytes);

        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getMainApplicationVersion while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }


}
