import {
    parseRawMotorsRequest
} from '../v1.0/command-parsers/0x16-drive/0x01-raw-motors-command-parser';

export function getCommandMessageParser(deviceId: number, commandId: number) {


    return parseRawMotorsRequest;

}
