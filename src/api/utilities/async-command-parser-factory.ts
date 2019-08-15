import {
    parseSensorStreamingDataNotify
} from '../v1.0/command-parsers/0x18-sensor/0x02-sensor-streaming-data-notify-command-parser';

export function getAsyncMessageParser(did: number, cid: number){
    console.log(did);
    console.log(cid);
    let parser : (dataRawBytes: Array<number>) => Array<number> | string;
    parser = (dataRawBytes: Array<number>) => "No parser found!";

    if (did == 24){
        if (cid == 2) {
            parser = parseSensorStreamingDataNotify;
        }

    } else if (did == 0) {
        if (cid == 0) {
            parser = parseSensorStreamingDataNotify;
        }

    } else if (did == 1) {
        if (cid == 0) {
            parser = parseSensorStreamingDataNotify;
        }
    }

    return parser;

}