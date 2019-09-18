import {IApiDal} from '../modules/api-dal-interface';
import {buildApiCommandMessageWithDefaultFlags, IApiCommandMessage} from './api-command-message';
import {getCommandParserFactory, ICommandParserHandler} from '../modules/command-parser-factory';
import {parseStartStreamingServiceRequest} from '../api/v1.0/command-parsers/0x18-sensor/0x3A-start-streaming-service-command-parser';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {SensorControl} from '../modules/sensor-control';
import {IStreamingSlotData, IStreamingSlot} from './streaming-slot';

/**
 * This class handles sensor streaming for a given provider (Nordic, ST). It is responsible for configuring, starting,
 * and stopping streaming, as well as for enabling the functionality to parse streaming data coming from the provider.
 */
export interface IStreamingProvider {
    readonly processorId: number;
    readonly hasEnabledStreamingServices: boolean;
    readonly isStreaming: boolean;

    startStreaming(streamingInterval: number): void;
    stopStreaming(): void;
}


export class StreamingProvider implements IStreamingProvider {
    private static readonly _configureCommandId: number = 0x39;
    private static readonly _configureCommandName: string = 'configure streaming services';

    private static readonly _startCommandId: number = 0x3A;
    private static readonly _startCommandName: string = 'start streaming services';

    private static readonly _stopCommandId: number = 0x3B;
    private static readonly _stopCommandName: string = 'stop streaming services';

    private static readonly _clearCommandId: number = 0x3C;
    private static readonly _clearCommandName: string = 'clear streaming services';

    private static readonly _sensorDataCommandId: number = 0x3D;
    private static readonly _sensorDataCommandName: string = 'streaming service data';

    private readonly _apiDal: IApiDal;

    private _streamingInterval: number = 0;

    private readonly _streamingSlots: Array<IStreamingSlot> = [];
    private readonly _streamingSlotByToken: Map<number, IStreamingSlot> = new Map<number, IStreamingSlot>();

    private readonly _processorId: number = 0;
    public get processorId(): number {
        return this._processorId;
    }

    public get hasEnabledStreamingServices(): boolean {
        for(let streamingSlot of this._streamingSlots) {
            if (streamingSlot.hasEnabledStreamingServices)
                return true;
        }
        return false;
    }

    public _isStreaming: boolean = false;
    public get isStreaming(): boolean {
        return this._isStreaming;
    }

    constructor(processorId: number, streamingSlots: Array<IStreamingSlot>, apiDal: IApiDal) {
        this._processorId = processorId;
        this._streamingSlots = streamingSlots;

        for(let streamingSlot of this._streamingSlots){
            this._streamingSlotByToken.set(streamingSlot.tokenId, streamingSlot);
        }

        let commandParserFactory = getCommandParserFactory();
        commandParserFactory.addParser(this._processorId, SensorControl.sensorDeviceId,
            StreamingProvider._sensorDataCommandId, this._buildStreamingServiceDataCommandParser());

        this._apiDal = apiDal;
    }

    public startStreaming(streamingInterval: number): void {
        if(!this.hasEnabledStreamingServices){
            throw new Error('streaming provider has no sensors configured to be streamed');
        }
        if(this.isStreaming){
            throw new Error('streaming provider is already streaming; stop current streaming first');
        }
        this._streamingInterval = streamingInterval;
        this._configureStreamingForEnabledSlots();
        this._sendStartStreamingCommandToProcessor();
        this._isStreaming = true;
    }

    public stopStreaming(): void {
        if(!this.isStreaming){
            throw new Error('cannot stop streaming because provider is not currently streaming');
        }
        this._sendStopStreamingCommandToProcessor();
        this._sendClearStreamingCommandToProcessor();
        this._disableStreamingForEnabledSlots();
        this._isStreaming = false;
    }

    private _sendStartStreamingCommandToProcessor(): void {
        let dataRawBytes: Array<number> = parseStartStreamingServiceRequest({'period': this._streamingInterval});

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            this._processorId, SensorControl.sourceId,
            SensorControl.sensorDeviceId, SensorControl.sensorDeviceName, StreamingProvider._startCommandId, StreamingProvider._startCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();

        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            //TODO: log response

        }).catch(reason => {
            let errorDetail: string = `Error in startStreamingStreamingServices while sending API Command: ${reason}`;
            throw new Error(errorDetail);
        });
    }

    private _sendStopStreamingCommandToProcessor(): void {
        let stopApiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            this._processorId, SensorControl.sourceId,
            SensorControl.sensorDeviceId, SensorControl.sensorDeviceName, StreamingProvider._stopCommandId, StreamingProvider._stopCommandName,
            null
        );

        stopApiCommandMessage.generateMessageRawBytes();

        this._apiDal.sendApiCommandMessage(stopApiCommandMessage).then(apiResponseMessage => {
            //TODO: log response

        }).catch(reason => {
            let errorDetail: string = `Error in stopStreamingStreamingServices while sending API Command: ${reason}`;
            throw new Error(errorDetail);
        });

    }

    private _sendClearStreamingCommandToProcessor(): void {
        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            this._processorId, SensorControl.sourceId,
            SensorControl.sensorDeviceId, SensorControl.sensorDeviceName, StreamingProvider._clearCommandId, StreamingProvider._clearCommandName,
            null
        );

        apiCommandMessage.generateMessageRawBytes();

        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            //TODO: log response

        }).catch(reason => {
            let errorDetail: string = `Error in clearStreamingStreamingServices while sending API Command: ${reason}`;
            throw new Error(errorDetail);
        });
    }

    private _sendConfigureStreamingSlotCommandToProcessor(streamingSlot: IStreamingSlot): void {
        let dataRawBytes: Array<number> = streamingSlot.getConfigurationBytes();

        let configureApiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            this._processorId, SensorControl.sourceId,
            SensorControl.sensorDeviceId, SensorControl.sensorDeviceName, StreamingProvider._configureCommandId, StreamingProvider._configureCommandName,
            dataRawBytes
        );

        configureApiCommandMessage.generateMessageRawBytes();

        this._apiDal.sendApiCommandMessage(configureApiCommandMessage).then(apiResponseMessage => {
            //TODO: log response

        }).catch(reason => {
            let errorDetail: string = `Error in configureStreamingStreamingServices while sending API Command: ${reason}`;
            throw new Error(errorDetail);
        });
    }

    private _disableStreamingForEnabledSlots(): void {
        for(let streamingSlot of this._streamingSlots){
            if (!streamingSlot.hasEnabledStreamingServices) {
                continue;
            }
            streamingSlot.disableStreamingServices();
        }
    }

    private _configureStreamingForEnabledSlots(): void {
        for(let steamingSlot of this._streamingSlots){
            if (!steamingSlot.hasEnabledStreamingServices) {
                continue;
            }
            this._sendConfigureStreamingSlotCommandToProcessor(steamingSlot);
        }
    }

    private _buildStreamingServiceDataCommandParser(): ICommandParserHandler {
        return (dataRawBytes: Array<number>): IStreamingServiceDataNotifyResponse => {
            let tokenBytes: Array<number> = ByteConversionUtilities.getInt8Bytes(dataRawBytes, 0);

            let tokenData: number[] = ByteConversionUtilities.byteToNibbles(ByteConversionUtilities.byteArrayToInt8(tokenBytes));
            let tokenId: number = tokenData[0];
            let tokenFlags: number = tokenData[1]; // TODO when do we care about this, what to do with it?

            let streamingSlot: IStreamingSlot | undefined = this._streamingSlotByToken.get(tokenId);
            if (streamingSlot == undefined)
                throw new Error(`unable to parse streaming data with token ID ${tokenId}`);

            return {
                sensorData: streamingSlot.parseStreamingSlotDataToObject(dataRawBytes.slice(1))
            };
        }
    }


}


interface IStreamingServiceDataNotifyResponse {
    readonly sensorData: IStreamingSlotData;
}
