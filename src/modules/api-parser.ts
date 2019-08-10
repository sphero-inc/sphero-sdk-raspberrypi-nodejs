// internal imports
import {IApiMessage} from '../models/api-message';
import {ApiErrorCodes, ApiFlags, ApiParserFlags, ApiProtocolErrorCodes} from '../constants';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities';
import {buildApiCommandMessage, IApiCommandMessage} from '../models/api-command-message';
import {buildApiResponseMessage} from '../models/api-response-message';
import {createLogger, ILogger} from './logger';


let logger: ILogger = createLogger('api-parser');


export interface IApiParser {
    readonly fwApiVersion: number;

    // callback once queued bytes have been parsed and an ApiMessage created (used by DAL)
    apiMessageParsedCallback: (apiMessage: IApiMessage) => void;

    apiProtocolErrorCallback: (errorCode: number) => void;

    // queue bytes received from the robot to be parsed (used by DAL)
    queueBytes(bytes: Array<number>): void;

    // get the raw bytes for an ApiMessage (used by end-point)
    generateRawBytesForApiMessage(apiMessage: IApiMessage): Array<number>;
}

enum ApiParserState {
    WaitingForStartOfPacket = 0,
    WaitingForEndOfPacket = 1
}

class ApiParser implements IApiParser {
    private _state: ApiParserState = ApiParserState.WaitingForStartOfPacket;
    private _isEscaped: boolean = false;
    private _hasSkippedData: boolean = false;
    private _runningChecksum: number = 0;
    private _activeDataBuffer: Array<number> = [];
    private readonly _minimumPacketLength: number = 7;

    public get fwApiVersion(): number {
        return 2.1;
    }

    public apiMessageParsedCallback: (apiMessage: IApiMessage) => void;
    public apiProtocolErrorCallback: (errorCode: number) => void;

    constructor() {
        // do nothing...
    }

    public queueBytes(bytes: Array<number>): void {
        if (!bytes || bytes.length == 0) {
            logger.warning('No bytes to queue');
            return;
        }

        logger.debug(`Queuing bytes: ${ByteConversionUtilities.convertNumbersToHexCsvString(bytes)}`);

        // TODO: eventually need to make the processing async...

        for (let i: number = 0; i < bytes.length; i++) {
            let byte: number = bytes[i];
            this.processByte(byte);
        }
    }

    public generateRawBytesForApiMessage(apiMessage: IApiMessage): Array<number> {
        return this.generateRawBytesForApiPacket(
            apiMessage.flags,
            apiMessage.targetId,
            apiMessage.sourceId,
            apiMessage.deviceId,
            apiMessage.commandId,
            apiMessage.sequenceNumber,
            apiMessage.dataRawBytes
        );
    }

    private processByte(byte: number): void {
        if (this._activeDataBuffer.length == 0 && byte != ApiParserFlags.startOfPacket) {
            this._hasSkippedData = true;

            logger.debug('Skipped data encountered');

            return;
        }

        try {
            switch (byte) {
                case ApiParserFlags.startOfPacket:
                    if (this._state != ApiParserState.WaitingForStartOfPacket) {
                        this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.earlyStartOfPacket);
                        this.resetParserState();
                        return;
                    }

                    if (this._hasSkippedData) {
                        this._hasSkippedData = false;
                        this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.skippedData);
                    }

                    this._state = ApiParserState.WaitingForEndOfPacket;
                    this._runningChecksum = 0;
                    this._activeDataBuffer.push(byte);

                    return;
                case ApiParserFlags.endOfPacket:
                    this._activeDataBuffer.push(byte);

                    if (this._state != ApiParserState.WaitingForEndOfPacket || this._activeDataBuffer.length < this._minimumPacketLength) {
                        this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.earlyEndOfPacket);
                        this.resetParserState();
                        return;
                    }

                    if (this._runningChecksum != 0xFF) {
                        this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.badChecksum);
                        this.resetParserState();
                        return;
                    }

                    let isRequestingResponse: boolean = (this._activeDataBuffer[1] & (ApiFlags.requestsResponse)) == (ApiFlags.requestsResponse);
                    let isResponse: boolean = (this._activeDataBuffer[1] & (ApiFlags.isResponse)) == (ApiFlags.isResponse);
                    
                    if (isRequestingResponse && isResponse) {
                        this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.badFlags);
                        this.resetParserState();
                        return;
                    }

                    let bufferCopy: Array<number> = this._activeDataBuffer.slice();
                    this.resetParserState();

                    let apiMessage: IApiMessage = this.generateApiMessageFromRawBytes(bufferCopy);
                    this.invokeApiMessageParsedCallback(apiMessage);

                    return;
                case ApiParserFlags.escape:
                    if (this._isEscaped) {
                        this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.badEscapeValue);
                        this.resetParserState();
                        return;
                    }

                    this._isEscaped = true;

                    return;
                case ApiParserFlags.escapedEscape:
                case ApiParserFlags.escapedStartOfPacket:
                case ApiParserFlags.escapedEndOfPacket:
                    if (this._isEscaped) {
                        byte = this.slipDecode(byte);
                        this._isEscaped = false;
                    }

                    break;
            }

            if (this._isEscaped) {
                this.invokeApiProtocolErrorCallback(ApiProtocolErrorCodes.badEscapeValue);
                this.resetParserState();
                return;
            }

            this._activeDataBuffer.push(byte);
            this._runningChecksum = ByteConversionUtilities.incrementByteValue(this._runningChecksum, byte);
        } catch (err) {
            // TODO: what should we do here?

            if (err && err.message) {
                logger.exception(err, err.message);
            } else {
                logger.exception(err, 'An unknown error occurred in processByte()');
            }
        }
    }

    private generateApiMessageFromRawBytes(bytes: Array<number>): IApiMessage {
        logger.debug('Generating API message from raw bytes');
        logger.debug(`Raw bytes: ${ByteConversionUtilities.convertNumbersToHexCsvString(bytes)}`);

        let flags: number = 0x00;
        let sequenceNumber: number = 0x00;

        let targetId: number = 0xFF;
        let sourceId: number = 0xFF;

        let isResponse: boolean = false;

        let did: number = 0x00;
        let cid: number = 0x00;

        let dataRawBytes: Array<number> = [];

        let errorCode: number | null = null;
        let errorMessage: string | null = null;

        try {
            // TODO: why check if less than 6?
            if (bytes.length < 6) {
                throw new Error('Processed bytes minimum length not met');
            }

            let index: number = 1;  // start at 1 to skip SoP

            flags = bytes[index++];

            if ((flags & ApiFlags.packetHasTargetId) > 0x00) {
                targetId = bytes[index++];
            }

            if ((flags & ApiFlags.packetHasSourceId) > 0x00) {
                sourceId = bytes[index++];
            }

            let endingBytesToIgnore: number = 2;    // Checksum and EoP

            // +3 to account for DID, CID and SequenceNumber
            if ((index + 3) > bytes.length - endingBytesToIgnore) {
                throw new Error('Processed bytes invalid length');
            }

            did = bytes[index++];
            cid = bytes[index++];

            sequenceNumber = bytes[index++];

            if ((flags & ApiFlags.isResponse) > 0x00) {
                errorCode = bytes[index++];     // TODO: what to do with error code?
                errorMessage = ApiErrorCodes.getApiErrorMessageFromCode(errorCode);
            }

            for (let i: number = index; i < bytes.length - endingBytesToIgnore; i++) {
                let rawByte: number = bytes[i];
                dataRawBytes.push(rawByte);
            }

            isResponse = (bytes[1] & (ApiFlags.isResponse)) == (ApiFlags.isResponse);
        } catch (err) {
            // TODO: what should we do here?

            if (err && err.message) {
                logger.exception(err, err.message);
            } else {
                logger.exception(err, 'An unknown error occurred in generateApiMessageFromRawBytes()');
            }
        }

        // TODO: where to get DID and CID names?
        let apiMessage: IApiMessage = isResponse
            ? buildApiCommandMessage(flags, sequenceNumber, targetId, sourceId, did, '', cid, '', dataRawBytes)
            : buildApiResponseMessage(flags, sequenceNumber, targetId, sourceId, did, '', cid, '', dataRawBytes);

        if (errorCode && errorMessage) {
            apiMessage.associateError(errorCode, errorMessage);
        }

        logger.debug(`Generated API message: ${apiMessage.prettyPrint()}`);

        return apiMessage;
    }

    private resetParserState(): void {
        logger.debug('Resetting parser state');

        this._state = ApiParserState.WaitingForStartOfPacket;
        this._isEscaped = false;
        this._activeDataBuffer.length = 0;
    }

    private generateResponseRawBytesForApiCommandMessage(apiCommandMessage: IApiCommandMessage, responseDataRawBytes: Array<number>): Array<number> {
        logger.debug('Generating response raw bytes for API command message');
        logger.debug(`API command message: ${apiCommandMessage.prettyPrint()}`);
        logger.debug(`Response raw bytes: ${ByteConversionUtilities.convertNumbersToHexCsvString(responseDataRawBytes)}`);

        let targetNibbles: Array<number> = ByteConversionUtilities.byteToNibbles(apiCommandMessage.targetId);
        targetNibbles[1] = 1;
        let targetId: number = ByteConversionUtilities.nibblesToByte(targetNibbles);

        let sourceNibbles: Array<number> = ByteConversionUtilities.byteToNibbles(apiCommandMessage.sourceId);
        sourceNibbles[1] = 0;
        let sourceId: number = ByteConversionUtilities.nibblesToByte(sourceNibbles);

        // swap source and target, and return response bytes
        return this.generateRawBytesForApiPacket(
            ApiFlags.defaultResponseFlags,
            sourceId,
            targetId,
            apiCommandMessage.deviceId,
            apiCommandMessage.commandId,
            apiCommandMessage.sequenceNumber,
            responseDataRawBytes
        );
    }
    private generateRawBytesForApiPacket(flags: number, targetId: number, sourceId: number, deviceId: number, commandId: number, sequenceNumber: number, dataRawBytes: Array<number>): Array<number> {
        logger.debug('Generating raw bytes for API packet');
        logger.debug(`Flags: ${ByteConversionUtilities.convertNumberToHexString(flags)}`);
        logger.debug(`TargetId: ${ByteConversionUtilities.convertNumberToHexString(targetId)}`);
        logger.debug(`SourceId: ${ByteConversionUtilities.convertNumberToHexString(sourceId)}`);
        logger.debug(`DeviceId: ${ByteConversionUtilities.convertNumberToHexString(deviceId)}`);
        logger.debug(`CommandId: ${ByteConversionUtilities.convertNumberToHexString(commandId)}`);
        logger.debug(`SequenceNumber: ${ByteConversionUtilities.convertNumberToHexString(sequenceNumber)}`);
        logger.debug(`DataRawBytes: ${ByteConversionUtilities.convertNumbersToHexCsvString(dataRawBytes)}`);

        let runningChecksum = 0;

        let rawBytesWithEscapes = [];
        rawBytesWithEscapes.push(ApiParserFlags.startOfPacket);

        this.encodeByteInBytes(rawBytesWithEscapes, flags);
        runningChecksum += flags;

        if ((flags & ApiFlags.packetHasTargetId) > 0x00) {
            this.encodeByteInBytes(rawBytesWithEscapes, targetId);
            runningChecksum += targetId;
        }

        if ((flags & ApiFlags.packetHasSourceId) > 0x00) {
            this.encodeByteInBytes(rawBytesWithEscapes, sourceId);
            runningChecksum += sourceId;
        }

        this.encodeByteInBytes(rawBytesWithEscapes, deviceId);
        runningChecksum += deviceId;

        this.encodeByteInBytes(rawBytesWithEscapes, commandId);
        runningChecksum += commandId;

        this.encodeByteInBytes(rawBytesWithEscapes, sequenceNumber);
        runningChecksum += sequenceNumber;

        if ((flags & ApiFlags.isResponse) > 0x00) {
            // TODO: need to be able to set the error
            let errorCode = ApiErrorCodes.success;
            this.encodeByteInBytes(rawBytesWithEscapes, errorCode);
            runningChecksum += errorCode;
        }

        if (!dataRawBytes) {
            dataRawBytes = [];
        }

        for (let i: number = 0; i < dataRawBytes.length; i++) {
            let dataByte = dataRawBytes[i];
            this.encodeByteInBytes(rawBytesWithEscapes, dataByte);
            runningChecksum += dataByte;
        }

        runningChecksum = ~(runningChecksum % 256);
        if (runningChecksum < 0) {
            runningChecksum = 256 + runningChecksum;
        }

        this.encodeByteInBytes(rawBytesWithEscapes, runningChecksum);

        rawBytesWithEscapes.push(ApiParserFlags.endOfPacket);

        logger.debug(`Generated raw bytes: ${ByteConversionUtilities.convertNumbersToHexCsvString(rawBytesWithEscapes)}`);

        return rawBytesWithEscapes;
    }

    private slipEncode(byte: number): number {
        return ((byte) & ~ApiParserFlags.slipEscapeMask);
    }
    private slipDecode(byte: number): number {
        return ((byte) | ApiParserFlags.slipEscapeMask);
    }
    private encodeByteInBytes(bytes: Array<number>, byte: number): void {
        switch (byte) {
            case ApiParserFlags.startOfPacket:
                bytes.push(ApiParserFlags.escape);
                bytes.push(ApiParserFlags.escapedStartOfPacket);
                break;
            case ApiParserFlags.endOfPacket:
                bytes.push(ApiParserFlags.escape);
                bytes.push(ApiParserFlags.escapedEndOfPacket);
                break;
            case ApiParserFlags.escape:
                bytes.push(ApiParserFlags.escape);
                bytes.push(ApiParserFlags.escapedEscape);
                break;
            default:
                bytes.push(byte);
                break;
        }
    }

    private invokeApiMessageParsedCallback(apiMessage: IApiMessage): void {
        logger.debug(`API message parsed: ${apiMessage.prettyPrint()}`);

        if (!this.apiMessageParsedCallback) {
            logger.warning('No callback found for apiMessageParsedCallback');
            return;
        }

        this.apiMessageParsedCallback(apiMessage);
    }
    private invokeApiProtocolErrorCallback(errorCode: number): void {
        logger.error(`API protocol error: ${ApiProtocolErrorCodes.getApiProtocolErrorMessageFromCode(errorCode)} (${errorCode})`)

        if (!this.apiProtocolErrorCallback) {
            logger.warning('No callback found for apiProtocolErrorCallback');
            return;
        }

        this.apiProtocolErrorCallback(errorCode);
    }
}

export class ApiParserFactory {
    private static _apiParser: ApiParser | null = null;

    public static getApiParser(): IApiParser {
        if (this._apiParser == null) {
            this._apiParser = new ApiParser();
        }

        return this._apiParser;
    }
}
