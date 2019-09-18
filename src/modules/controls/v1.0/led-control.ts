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

    public getAvailableLedGroups(): Array<string> {
        return LedGroups.ledGroupNames;
    }

    public getAvailableColors(): Array<string> {
        return Colors.colorNames;
    }

    public turnLedsOff(): void {
        let ledGroup: number = LedGroups.allLights;

        let ledBrightnessValues: Array<number> = [];
        for (let i = 0; i < LedControl._numberOfLedGroups; i++) {
            for (let colorValue of Colors.getColorValuesByName(Colors.off))
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
    public static readonly red: string = 'red';
    public static readonly green: string = 'green';
    public static readonly blue: string = 'blue';
    public static readonly off: string = 'off';
    public static readonly white: string = 'white';
    public static readonly yellow: string = 'yellow';
    public static readonly purple: string = 'purple';
    public static readonly orange: string = 'orange';
    public static readonly pink: string = 'pink';

    private static colors: Map<string, Array<number>> = new Map<string, Array<number>>([
        [Colors.red, [0xFF, 0x00, 0x00]],
        [Colors.green, [0x00, 0xFF, 0x00]],
        [Colors.blue, [0x00, 0x00, 0xFF]],
        [Colors.off, [0x00, 0x00, 0x00]],
        [Colors.white, [0xFF, 0xFF, 0xFF]],
        [Colors.yellow, [0xFF, 0x90, 0x00]],
        [Colors.purple, [0xFF, 0x00, 0xFF]],
        [Colors.orange, [0xFF, 0x20, 0x00]],
        [Colors.pink, [0xFF, 0x66, 0xB2]]
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
    public static readonly rightHeadlightRed: number = 0x00000001;
    public static readonly rightHeadlightGreen: number = 0x00000002;
    public static readonly rightHeadlightBlue: number = 0x00000004;
    public static readonly leftHeadlightRed: number = 0x00000008;
    public static readonly leftHeadlightGreen: number = 0x00000010;
    public static readonly leftHeadlightBlue: number = 0x00000020;
    public static readonly leftStatusIndicationRed: number = 0x00000040;
    public static readonly leftStatusIndicationGreen: number = 0x00000080;
    public static readonly leftStatusIndicationBlue: number = 0x00000100;
    public static readonly rightStatusIndicationRed: number = 0x00000200;
    public static readonly rightStatusIndicationGreen: number = 0x00000400;
    public static readonly rightStatusIndicationBlue: number = 0x00000800;
    public static readonly batteryDoorFrontRed: number = 0x00001000;
    public static readonly batteryDoorFrontGreen: number = 0x00002000;
    public static readonly batteryDoorFrontBlue: number = 0x00004000;
    public static readonly batteryDoorRearRed: number = 0x00008000;
    public static readonly batteryDoorRearGreen: number = 0x00010000;
    public static readonly batteryDoorRearBlue: number = 0x00020000;
    public static readonly powerButtonFrontRed: number = 0x00040000;
    public static readonly powerButtonFrontGreen: number = 0x00080000;
    public static readonly powerButtonFrontBlue: number = 0x00100000;
    public static readonly powerButtonRearRed: number = 0x00200000;
    public static readonly powerButtonRearGreen: number = 0x00400000;
    public static readonly powerButtonRearBlue: number = 0x00800000;
    public static readonly leftBrakelightRed: number = 0x01000000;
    public static readonly leftBrakelightGreen: number = 0x02000000;
    public static readonly leftBrakelightBlue: number = 0x04000000;
    public static readonly rightBrakelightRed: number = 0x08000000;
    public static readonly rightBrakelightGreen: number = 0x10000000;
    public static readonly rightBrakelightBlue: number = 0x20000000;
    public static readonly undercarriageWhite: number = 0x40000000;
}

export class LedGroups {
    public static readonly statusIndicationLeft: string = 'statusIndicationLeft';
    public static readonly statusIndicationRight: string = 'statusIndicationRight';
    public static readonly headlightLeft: string = 'headlightLeft';
    public static readonly headlightRight: string = 'headlightRight';
    public static readonly batteryDoorFront: string = 'batteryDoorFront';
    public static readonly batteryDoorRear: string = 'batteryDoorRear';
    public static readonly powerButtonFront: string = 'powerButtonFront';
    public static readonly powerButtonRear: string = 'powerButtonRear';
    public static readonly brakelightLeft: string = 'brakelightLeft';
    public static readonly brakelightRight: string = 'brakelightRight';
    public static readonly undercarriageWhite: string = 'undercarriageWhite';

    private static ledGroups: Map<string, number> = new Map<string, number>([
        [LedGroups.statusIndicationLeft, LedBitmasks.leftStatusIndicationRed | LedBitmasks.leftStatusIndicationGreen |
            LedBitmasks.leftStatusIndicationBlue],
        [LedGroups.statusIndicationRight, LedBitmasks.rightStatusIndicationRed | LedBitmasks.rightStatusIndicationGreen |
            LedBitmasks.rightStatusIndicationBlue],
        [LedGroups.headlightLeft, LedBitmasks.leftHeadlightRed | LedBitmasks.leftHeadlightGreen |
            LedBitmasks.leftHeadlightBlue],
        [LedGroups.headlightRight, LedBitmasks.rightHeadlightRed | LedBitmasks.rightHeadlightGreen |
            LedBitmasks.rightHeadlightBlue],
        [LedGroups.batteryDoorFront, LedBitmasks.batteryDoorFrontRed | LedBitmasks.batteryDoorFrontGreen |
            LedBitmasks.batteryDoorFrontBlue],
        [LedGroups.batteryDoorRear, LedBitmasks.batteryDoorRearRed | LedBitmasks.batteryDoorRearGreen |
            LedBitmasks.batteryDoorRearBlue],
        [LedGroups.powerButtonFront, LedBitmasks.powerButtonFrontRed | LedBitmasks.powerButtonFrontGreen |
            LedBitmasks.powerButtonFrontBlue],
        [LedGroups.powerButtonRear, LedBitmasks.powerButtonRearRed | LedBitmasks.powerButtonRearGreen |
            LedBitmasks.powerButtonRearBlue],
        [LedGroups.brakelightLeft, LedBitmasks.leftBrakelightRed | LedBitmasks.leftBrakelightGreen |
            LedBitmasks.leftBrakelightBlue],
        [LedGroups.brakelightRight, LedBitmasks.rightBrakelightRed | LedBitmasks.rightBrakelightGreen |
            LedBitmasks.rightBrakelightBlue],
        [LedGroups.undercarriageWhite, LedBitmasks.undercarriageWhite]
    ]);

    public static get ledGroupNames(): Array<string> {
        return Array.from(this.ledGroups.keys());
    }

    public static get aimLedGroup(): Array<string> {
        return [this.brakelightLeft, this.brakelightRight];
    }

    public static getLedGroupBitmaskByName(ledGroupName: string) {
        let ledGroupBitmask: number | undefined = this.ledGroups.get(ledGroupName);
        if (ledGroupBitmask == undefined) {
            throw new Error(`no such color: ${ledGroupName}`);
        }

        return ledGroupBitmask;
    }

    public static get allLights(): number {
        return <number>this.ledGroups.get(LedGroups.statusIndicationLeft)
            | <number>this.ledGroups.get(LedGroups.statusIndicationRight)
            | <number>this.ledGroups.get(LedGroups.headlightLeft)
            | <number>this.ledGroups.get(LedGroups.headlightRight)
            | <number>this.ledGroups.get(LedGroups.batteryDoorFront)
            | <number>this.ledGroups.get(LedGroups.batteryDoorRear)
            | <number>this.ledGroups.get(LedGroups.powerButtonFront)
            | <number>this.ledGroups.get(LedGroups.powerButtonRear)
            | <number>this.ledGroups.get(LedGroups.brakelightLeft)
            | <number>this.ledGroups.get(LedGroups.brakelightRight);
    }
}
