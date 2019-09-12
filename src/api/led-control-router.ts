// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from './router-base';
import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../models/api-command-message';
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {ApiTargetsAndSources} from '../constants';
import {parseSetAllLedsWith32BitMaskRequest} from "./v1.0/command-parsers/0x1A-io/0x1A-set-all-leds-with-32-bit-mask-command-parser";


export class LedControlRouter extends RouterBase {
    private static readonly _routerName: string = 'LedControl';

    private static readonly _deviceId: number = 0x1A;
    private static readonly _deviceName: string = 'Io (0x1A)';
    private static readonly _setAllLEDsWith32BitMaskCommandId: number = 0x1A;
    private static readonly _setAllLEDsWith32BitMaskCommandName: string = 'Set All LEDs with 32 bit Mask';


    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(LedControlRouter._routerName, apiDal, configuration);
    }

    protected initializeRoutes(): void {
        this.router.route('/getAvailableLedGroups')
            .get((request: Request, response: Response) => this.getAvailableLedGroups(request, response));

        this.router.route('/getAvailableColors')
            .get((request: Request, response: Response) => this.getAvailableColors(request, response));

        this.router.route('/turnLedsOff')
            .put((request: Request, response: Response) => this.turnLedsOff(request, response));

        this.router.route('/setLedRgb')
            .put((request: Request, response: Response) => this.setLedRgb(request, response));

        this.router.route('/setLedColor')
            .put((request: Request, response: Response) => this.setLedColor(request, response));

        this.router.route('/setAllLedsRgb')
            .put((request: Request, response: Response) => this.setAllLedsRgb(request, response));

        this.router.route('/setAllLedsColor')
            .put((request: Request, response: Response) => this.setAllLedsColor(request, response));

        this.router.route('/setMultipleLedsRgb')
            .put((request: Request, response: Response) => this.setMultipleLedsRgb(request, response));

        this.router.route('/setMultipleLedsColor')
            .put((request: Request, response: Response) => this.setMultipleLedsColor(request, response));
    }

    public getAvailableLedGroups(request: Request, response: Response) {
        response.status(200).json(Object.keys(LedGroups).filter(k => typeof LedGroups[k as any] === "number"));
    }

    public getAvailableColors(request: Request, response: Response) {
        response.status(200).json(Array.from(Object.keys(colors)));
    }

    public turnLedsOff(request: Request, response: Response) {

        let ledGroup: number = LedGroups.all_lights;

        let ledBrightnessValues: Array<number> = [];
        for(let i=0; i<10; i++){
            for(let colorValue of colors.off)
                ledBrightnessValues.push(colorValue);
        }

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }

    public setLedRgb(request: Request, response: Response) {

        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        let ledGroup: string = LedGroups[request.body.ledGroup];
        console.log(`led group: ${ledGroup}`);

        let ledBrightnessValues: Array<number> = [parseInt(request.body.R), parseInt(request.body.G), parseInt(request.body.B)];
        console.log(`led brightnessvalues: ${ledBrightnessValues}`);

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }

    public setLedColor(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        let ledGroup: string = LedGroups[request.body.ledGroup];
        console.log(`led group: ${ledGroup}`);

        let ledBrightnessValues: Array<number> = colors[request.body.color];
        console.log(`led brightnessvalues: ${ledBrightnessValues}`);

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }

    public setAllLedsRgb(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        let ledGroup: number = LedGroups.all_lights;

        let ledBrightnessValues: Array<number> = [];

        for(let i=0; i<10; i++){
            for(let colorValue of [parseInt(request.body.R), parseInt(request.body.G), parseInt(request.body.B)])
                ledBrightnessValues.push(colorValue);
        }

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }

    public setAllLedsColor(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        let ledGroup: number = LedGroups.all_lights;

        let ledBrightnessValues: Array<number> = [];

        for(let i=0; i<10; i++){
            for(let colorValue of colors[request.body.color])
                ledBrightnessValues.push(colorValue);
        }

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }

    public setMultipleLedsRgb(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        console.log(request.body);
        let ledGroup: number = 0;
        let ledBrightnessValues: Array<number> = [];

        for(let ledGroupRequested of request.body.ledGroups){
            ledGroup = ledGroup | parseInt(LedGroups[ledGroupRequested]);

            for(let colorValue of [parseInt(request.body.R), parseInt(request.body.G), parseInt(request.body.B)])
                ledBrightnessValues.push(colorValue);
        }

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }

    public setMultipleLedsColor(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';

            response.status(errorCode).json({'error': errorDetail});

            return;
        }

        console.log(request.body);
        let ledGroup: number = 0;
        let ledBrightnessValues: Array<number> = [];

        for(let ledGroupRequested of request.body.ledGroups){
            ledGroup = ledGroup | parseInt(LedGroups[ledGroupRequested]);

            for(let colorValue of colors[request.body.color])
                ledBrightnessValues.push(colorValue);
        }

        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let targetId: number = 0x01;

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            LedControlRouter._deviceId, LedControlRouter._deviceName,
            LedControlRouter._setAllLEDsWith32BitMaskCommandId, LedControlRouter._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            response.status(200).json("OK");


        }).catch(reason => {
            let errorCode: number = 400;
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            response.status(errorCode).json({'error': errorDetail});
        });
    }
}

enum LedBitmasks {
    right_headlight_red = 0x00000001,
    right_headlight_green = 0x00000002,
    right_headlight_blue = 0x00000004,
    left_headlight_red = 0x00000008,
    left_headlight_green = 0x00000010,
    left_headlight_blue = 0x00000020,
    left_status_indication_red = 0x00000040,
    left_status_indication_green = 0x00000080,
    left_status_indication_blue = 0x00000100,
    right_status_indication_red = 0x00000200,
    right_status_indication_green = 0x00000400,
    right_status_indication_blue = 0x00000800,
    battery_door_front_red = 0x00001000,
    battery_door_front_green = 0x00002000,
    battery_door_front_blue = 0x00004000,
    battery_door_rear_red = 0x00008000,
    battery_door_rear_green = 0x00010000,
    battery_door_rear_blue = 0x00020000,
    power_button_front_red = 0x00040000,
    power_button_front_green = 0x00080000,
    power_button_front_blue = 0x00100000,
    power_button_rear_red = 0x00200000,
    power_button_rear_green = 0x00400000,
    power_button_rear_blue = 0x00800000,
    left_brakelight_red = 0x01000000,
    left_brakelight_green = 0x02000000,
    left_brakelight_blue = 0x04000000,
    right_brakelight_red = 0x08000000,
    right_brakelight_green = 0x10000000,
    right_brakelight_blue = 0x20000000,
    undercarriage_white = 0x40000000,
}

enum LedGroups {
    status_indication_left = LedBitmasks.left_status_indication_red |
        LedBitmasks.left_status_indication_green |
        LedBitmasks.left_status_indication_blue,
    status_indication_right = LedBitmasks.right_status_indication_red |
        LedBitmasks.right_status_indication_green |
        LedBitmasks.right_status_indication_blue,
    headlight_left = LedBitmasks.left_headlight_red |
        LedBitmasks.left_headlight_green |
        LedBitmasks.left_headlight_blue,
    headlight_right = LedBitmasks.right_headlight_red |
        LedBitmasks.right_headlight_green |
        LedBitmasks.right_headlight_blue,
    battery_door_front = LedBitmasks.battery_door_front_red |
        LedBitmasks.battery_door_front_green |
        LedBitmasks.battery_door_front_blue,
    battery_door_rear = LedBitmasks.battery_door_rear_red |
        LedBitmasks.battery_door_rear_green |
        LedBitmasks.battery_door_rear_blue,
    power_button_front = LedBitmasks.power_button_front_red |
        LedBitmasks.power_button_front_green |
        LedBitmasks.power_button_front_blue,
    power_button_rear = LedBitmasks.power_button_rear_red |
        LedBitmasks.power_button_rear_green |
        LedBitmasks.power_button_rear_blue,
    brakelight_left = LedBitmasks.left_brakelight_red |
        LedBitmasks.left_brakelight_green |
        LedBitmasks.left_brakelight_blue,
    brakelight_right = LedBitmasks.right_brakelight_red |
        LedBitmasks.right_brakelight_green |
        LedBitmasks.right_brakelight_blue,
    all_lights = status_indication_left |
        status_indication_right |
        headlight_left |
        headlight_right |
        battery_door_front |
        battery_door_rear |
        power_button_front |
        power_button_rear |
        brakelight_left |
        brakelight_right,
    undercarriage_white = LedBitmasks.undercarriage_white

}

let colors: Colors = {
    red: [0xFF, 0x00, 0x00],
    green: [0x00, 0xFF, 0x00],
    blue: [0x00, 0x00, 0xFF],
    off: [0x00, 0x00, 0x00],
    white: [0xFF, 0xFF, 0xFF],
    yellow: [0xFF, 0x90, 0x00],
    purple: [0xFF, 0x00, 0xFF],
    orange: [0xFF, 0x20, 0x00],
    pink: [0xFF, 0x66, 0xB2]
};

interface Colors {
    red: Array<number>,
    green: Array<number>,
    blue: Array<number>,
    off: Array<number>,
    white: Array<number>,
    yellow: Array<number>;
    purple: Array<number>,
    orange: Array<number>,
    pink: Array<number>,
    [key: string]: Array<number>;
}

