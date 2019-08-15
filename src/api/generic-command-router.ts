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
        console.log(request);
        return;

        // we need a way to invoke the correct parser here
        // use the same logic as with sockets parser
        // let dataRawBytes: Array<number> = parse...(request.body.data);

        // DO ANOTHER FETCH
        // does not work -- returns already parsed payload
        // make fetch through actual API or make internally?
        // let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.body.targetId)].reverse());
        // let deviceId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.body.deviceId)].reverse());
        // let commandId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.body.commandId)].reverse());
        // let sourceId: number = ApiTargetsAndSources.serviceSource;
        //
        // let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
        //     targetId, ApiTargetsAndSources.serviceSource,
        //     SystemInfoDeviceRouter._deviceId, SystemInfoDeviceRouter._deviceName,
        //     commandId, commandName,
        //     dataRawBytes
        // );
        //
        // apiCommandMessage.generateMessageRawBytes();
        // this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
        //     response.status(200).json(apiResponseMessage.dataRawBytes);
        //
        // }).catch(reason => {
        //     let errorCode: number = 400;
        //     let errorDetail: string = `Error in getMainApplicationVersion while sending API Command: ${reason}`;
        //
        //     this.routeError(request.path, request.method, errorCode, errorDetail);
        //
        //     response.status(errorCode).json({'error': errorDetail});
        // });
    }


}
