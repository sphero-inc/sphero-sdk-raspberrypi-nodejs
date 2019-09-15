import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../../models/api-command-message';
import {IApiDal} from '../api-dal-interface';
import {ApiTargetsAndSources} from '../../constants';
import {parseSetAllLedsWith32BitMaskRequest} from "../../api/v1.0/command-parsers/0x1A-io/0x1A-set-all-leds-with-32-bit-mask-command-parser";

export class LedControl {
    private static readonly _targetId: number = 0x01;

    private static readonly _deviceId: number = 0x1A;
    private static readonly _deviceName: string = 'Io (0x1A)';

    private static readonly _setAllLEDsWith32BitMaskCommandId: number = 0x1A;
    private static readonly _setAllLEDsWith32BitMaskCommandName: string = 'Set All LEDs with 32 bit Mask';

    private static readonly _numberOfLedGroups: number = 10;

    private readonly _apiDal: IApiDal;

    constructor(apiDal: IApiDal) {
        this._apiDal = apiDal;
    }

    /**
     * NOTE: this is hell of an ugly way to retrieve the keys for an enum, however, it appears to be
     * the only way. See https://github.com/Microsoft/TypeScript/issues/17198.
     */
    public getAvailableLedGroups(): Array<string> {
        return Object.keys(LedGroups).filter(k => typeof LedGroups[k as any] === "number");
    }

    public getAvailableColors(): Array<string> {
        return Array.from(Object.keys(LedControl._colors));
    }

    public turnLedsOff(): void {
        let ledGroup: number = LedGroups.all_lights;

        let ledBrightnessValues: Array<number> = [];
        for(let i=0; i<LedControl._numberOfLedGroups; i++){
            for(let colorValue of LedControl._colors.off)
                ledBrightnessValues.push(colorValue);
        }

        this._sendAllLEDsWith32BitMaskCommand(ledGroup, ledBrightnessValues);

    }

    public setLedRgb(ledGroup: keyof typeof LedGroups, R: number, G: number, B: number): void {
        this._sendAllLEDsWith32BitMaskCommand(LedGroups[ledGroup], [R, G, B]);
    }

    public setLedColor(ledGroup: keyof typeof LedGroups, color: string): void {
        this._sendAllLEDsWith32BitMaskCommand(LedGroups[ledGroup], LedControl._colors[color]);

    }

    public setAllLedsRgb(R: number, G: number, B: number): void {
        let ledBrightnessValues: Array<number> = [];

        for(let i=0; i<LedControl._numberOfLedGroups; i++){
            for(let colorValue of [R, G, B])
                ledBrightnessValues.push(colorValue);
        }

        this._sendAllLEDsWith32BitMaskCommand(LedGroups.all_lights, ledBrightnessValues);
    }

    public setAllLedsColor(color: string): void {
        let ledBrightnessValues: Array<number> = [];

        for(let i=0; i<LedControl._numberOfLedGroups; i++){
            for(let colorValue of LedControl._colors[color])
                ledBrightnessValues.push(colorValue);
        }

        this._sendAllLEDsWith32BitMaskCommand(LedGroups.all_lights, ledBrightnessValues);
    }

    public setMultipleLedsRgb(ledGroups: Array<keyof typeof LedGroups>, R: number, G: number, B: number): void {
        for(let ledGroup of ledGroups){
            this.setLedRgb(ledGroup, R, G, B);
        }
    }

    public setMultipleLedsColor(ledGroups: Array<keyof typeof LedGroups>, color: string): void {
        for(let ledGroup of ledGroups){
            this.setLedColor(ledGroup, color);
        }
    }

    private _sendAllLEDsWith32BitMaskCommand(ledGroup: number, ledBrightnessValues: Array<number>) {
        let dataRawBytes: Array<number> = parseSetAllLedsWith32BitMaskRequest({'ledGroup': ledGroup, 'ledBrightnessValues': ledBrightnessValues});

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            LedControl._targetId, ApiTargetsAndSources.serviceSource,
            LedControl._deviceId, LedControl._deviceName,
            LedControl._setAllLEDsWith32BitMaskCommandId, LedControl._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response

        }).catch(reason => {
            let errorDetail: string = `Error in setAllLedsWith32BitMask while sending API Command: ${reason}`;

            throw new Error(errorDetail);
        });
    }

    /**
     * NOTE: unfortunately, TypeScript does not support enums with arbitrary types (array in this case), but
     * only for number and string, which is why _colors is not simply an enum.
     */
    private static readonly _colors: Colors = {
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

interface Colors {
    [key: string]: Array<number>;
}
