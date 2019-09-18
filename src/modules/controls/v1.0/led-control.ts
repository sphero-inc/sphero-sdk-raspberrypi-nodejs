import {IApiCommandMessage, buildApiCommandMessageWithDefaultFlags} from '../../../models/api-command-message';
import {IApiDal} from '../../api-dal-interface';
import {ApiTargetsAndSources} from '../../../constants';
import {parseSetAllLedsRequest} from '../../../api/v1.0/command-parsers/0x1A-io/0x1A-set-all-leds-command-parser';

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
        return Array.from(Object.keys(LedGroups));
    }

    public getAvailableColors(): Array<string> {
        return Array.from(Object.keys(Colors));
    }

    public turnLedsOff(): void {
        let ledGroup: number = LedGroups.allLights;

        let ledBrightnessValues: Array<number> = [];
        for (let i = 0; i < LedControl._numberOfLedGroups; i++) {
            for (let colorValue of Colors.getColorValuesByName('off'))
                ledBrightnessValues.push(colorValue);
        }

        this._sendAllLEDsWith32BitMaskCommand(ledGroup, ledBrightnessValues);

    }

    public setLedRgb(ledGroup: string, red: number, green: number, blue: number): void {
        this._sendAllLEDsWith32BitMaskCommand(LedGroups.getLedGroupBitmaskByName(ledGroup), [red, green, blue]);
    }

    public setLedColor(ledGroup: string, color: string): void {
        this._sendAllLEDsWith32BitMaskCommand(LedGroups.getLedGroupBitmaskByName(ledGroup), Colors.getColorValuesByName(color));

    }

    public setAllLedsRgb(red: number, green: number, blue: number): void {
        let ledBrightnessValues: Array<number> = [];

        for (let i = 0; i < LedControl._numberOfLedGroups; i++) {
            for (let colorValue of [red, green, blue])
                ledBrightnessValues.push(colorValue);
        }

        this._sendAllLEDsWith32BitMaskCommand(LedGroups.allLights, ledBrightnessValues);
    }

    public setAllLedsColor(color: string): void {
        let ledBrightnessValues: Array<number> = [];

        for (let i = 0; i < LedControl._numberOfLedGroups; i++) {
            for (let colorValue of Colors.getColorValuesByName(color))
                ledBrightnessValues.push(colorValue);
        }

        this._sendAllLEDsWith32BitMaskCommand(LedGroups.allLights, ledBrightnessValues);
    }

    public setMultipleLedsRgb(ledGroups: Array<string>, red: number, green: number, blue: number): void {
        for (let ledGroup of ledGroups) {
            this.setLedRgb(ledGroup, red, green, blue);
        }
    }

    public setMultipleLedsColor(ledGroups: Array<string>, color: string): void {
        for (let ledGroup of ledGroups) {
            this.setLedColor(ledGroup, color);
        }
    }

    private _sendAllLEDsWith32BitMaskCommand(ledGroup: number, ledBrightnessValues: Array<number>) {
        let dataRawBytes: Array<number> = parseSetAllLedsRequest({
            'ledGroup': ledGroup,
            'ledBrightnessValues': ledBrightnessValues
        });

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            LedControl._targetId, ApiTargetsAndSources.serviceSource,
            LedControl._deviceId, LedControl._deviceName,
            LedControl._setAllLEDsWith32BitMaskCommandId, LedControl._setAllLEDsWith32BitMaskCommandName,
            dataRawBytes
        );

        apiCommandMessage.generateMessageRawBytes();
        this._apiDal.sendApiCommandMessage(apiCommandMessage).then(apiResponseMessage => {
            // TODO log response

        });
    }

}

export class Colors {
    private static colors: Map<string, Array<number>> = new Map<string, Array<number>>([
        ['red', [0xFF, 0x00, 0x00]],
        ['green', [0x00, 0xFF, 0x00]],
        ['blue', [0x00, 0x00, 0xFF]],
        ['off', [0x00, 0x00, 0x00]],
        ['white', [0xFF, 0xFF, 0xFF]],
        ['yellow', [0xFF, 0x90, 0x00]],
        ['purple', [0xFF, 0x00, 0xFF]],
        ['orange', [0xFF, 0x20, 0x00]],
        ['pink', [0xFF, 0x66, 0xB2]]
    ]);

    public static get colorNames(): Array<string> {
        return Array.from(this.colors.keys());
    }

    public static getColorValuesByName(colorName: string): Array<number> {
        let colorValues: Array<number> | undefined = this.colors.get(colorName);
        if (colorValues == undefined) {
            throw new Error(`no such color: ${colorName}`);
        }
        return colorValues;
    }
}

class LedBitmasks {
    public static rightHeadlightRed: number = 0x00000001;
    public static rightHeadlightGreen: number = 0x00000002;
    public static rightHeadlightBlue: number = 0x00000004;
    public static leftHeadlightRed: number = 0x00000008;
    public static leftHeadlightGreen: number = 0x00000010;
    public static leftHeadlightBlue: number = 0x00000020;
    public static leftStatusIndicationRed: number = 0x00000040;
    public static leftStatusIndicationGreen: number = 0x00000080;
    public static leftStatusIndicationBlue: number = 0x00000100;
    public static rightStatusIndicationRed: number = 0x00000200;
    public static rightStatusIndicationGreen: number = 0x00000400;
    public static rightStatusIndicationBlue: number = 0x00000800;
    public static batteryDoorFrontRed: number = 0x00001000;
    public static batteryDoorFrontGreen: number = 0x00002000;
    public static batteryDoorFrontBlue: number = 0x00004000;
    public static batteryDoorRearRed: number = 0x00008000;
    public static batteryDoorRearGreen: number = 0x00010000;
    public static batteryDoorRearBlue: number = 0x00020000;
    public static powerButtonFrontRed: number = 0x00040000;
    public static powerButtonFrontGreen: number = 0x00080000;
    public static powerButtonFrontBlue: number = 0x00100000;
    public static powerButtonRearRed: number = 0x00200000;
    public static powerButtonRearGreen: number = 0x00400000;
    public static powerButtonRearBlue: number = 0x00800000;
    public static leftBrakelightRed: number = 0x01000000;
    public static leftBrakelightGreen: number = 0x02000000;
    public static leftBrakelightBlue: number = 0x04000000;
    public static rightBrakelightRed: number = 0x08000000;
    public static rightBrakelightGreen: number = 0x10000000;
    public static rightBrakelightBlue: number = 0x20000000;
    public static undercarriageWhite: number = 0x40000000;
}

export class LedGroups {
    private static ledGroups: Map<string, number> = new Map<string, number>([
        ['statusIndicationLeft', LedBitmasks.leftStatusIndicationRed | LedBitmasks.leftStatusIndicationGreen |
            LedBitmasks.leftStatusIndicationBlue],
        ['statusIndicationRight', LedBitmasks.rightStatusIndicationRed | LedBitmasks.rightStatusIndicationGreen |
            LedBitmasks.rightStatusIndicationBlue],
        ['headlightLeft', LedBitmasks.leftHeadlightRed | LedBitmasks.leftHeadlightGreen |
            LedBitmasks.leftHeadlightBlue],
        ['headlightRight', LedBitmasks.rightHeadlightRed | LedBitmasks.rightHeadlightGreen |
            LedBitmasks.rightHeadlightBlue],
        ['batteryDoorFront', LedBitmasks.batteryDoorFrontRed | LedBitmasks.batteryDoorFrontGreen |
            LedBitmasks.batteryDoorFrontBlue],
        ['batteryDoorRear', LedBitmasks.batteryDoorRearRed | LedBitmasks.batteryDoorRearGreen |
            LedBitmasks.batteryDoorRearBlue],
        ['powerButtonFront', LedBitmasks.powerButtonFrontRed | LedBitmasks.powerButtonFrontGreen |
            LedBitmasks.powerButtonFrontBlue],
        ['powerButtonRear', LedBitmasks.powerButtonRearRed | LedBitmasks.powerButtonRearGreen |
            LedBitmasks.powerButtonRearBlue],
        ['brakelightLeft', LedBitmasks.leftBrakelightRed | LedBitmasks.leftBrakelightGreen |
            LedBitmasks.leftBrakelightBlue],
        ['brakelightRight', LedBitmasks.rightBrakelightRed | LedBitmasks.rightBrakelightGreen |
            LedBitmasks.rightBrakelightBlue],
        ['undercarriageWhite', LedBitmasks.undercarriageWhite]
    ]);

    public static get ledGroupNames(): Array<string> {
        return Array.from(this.ledGroups.keys());
    }

    public static getLedGroupBitmaskByName(ledGroupName: string) {
        let ledGroupBitmask: number | undefined = this.ledGroups.get(ledGroupName);
        if (ledGroupBitmask == undefined) {
            throw new Error(`no such color: ${ledGroupName}`);
        }
        return ledGroupBitmask;
    }

    public static get allLights(): number {
        return <number>this.ledGroups.get('statusIndicationLeft') | <number>this.ledGroups.get('statusIndicationRight') |
            <number>this.ledGroups.get('headlightLeft') | <number>this.ledGroups.get('headlightRight') |
            <number>this.ledGroups.get('batteryDoorFront') | <number>this.ledGroups.get('batteryDoorRear') |
            <number>this.ledGroups.get('powerButtonFront') | <number>this.ledGroups.get('powerButtonRear') |
            <number>this.ledGroups.get('brakelightLeft') | <number>this.ledGroups.get('brakelightRight')
    }
}
