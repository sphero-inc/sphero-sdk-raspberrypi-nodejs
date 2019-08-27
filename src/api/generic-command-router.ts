// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from './router-base';
import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../models/api-command-message';
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {ApiTargetsAndSources} from '../constants';


export class GenericCommandRouter extends RouterBase {
    private static readonly _routerName: string = 'GenericCommand';

    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(GenericCommandRouter._routerName, apiDal, configuration);
    }

    protected initializeRoutes(): void {
        this.router.route('/genericCommand/:targetId')
            .put((request: Request, response: Response) => this.getBytesFromGenericCommand(request, response));
    }

    public getBytesFromGenericCommand(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;

            let errorDetail: string = 'Payload is required!';
            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        if (!request.params.targetId) {
            let errorCode: number = 400;
            let errorDetail: string = 'targetId is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        let targetId: number = ByteConversionUtilities.nibblesToByte([1, parseInt(request.params.targetId)].reverse());

        let deviceId: number = request.body.deviceId;
        let deviceName: string = 'generic';
        let commandId: number = request.body.commandId;
        let commandName: string = 'generic';

        let dataRawBytes: number[] | null = request.body.data;

        // TODO: log this -- the logger helpers are not available in this base class
        // this.logRequest(request.path, request.method,
        //     deviceId, deviceName,
        //     commandId, commandName,
        //     sourceId, targetId,
        //     JSON.stringify(dataRawBytes)
        // );

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            deviceId, deviceName,
            commandId, commandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json(apiResponseMessage.messageRawBytes);

        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in getBytesFromGenericCommand while sending API Command: ${reason}`;

            // TODO: log this -- the logger helpers are not available in this base class
            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        });
    }
}
