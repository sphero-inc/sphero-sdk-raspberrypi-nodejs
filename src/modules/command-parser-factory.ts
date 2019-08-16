export class CommandParserFactory {
    private _asyncParserMapping : Map<any, any>;

    constructor() {
        this._asyncParserMapping = new Map<any, any>();
    }

    public addParser(deviceId: number, commandId: number, parser: any) {
        this._asyncParserMapping.set(`${deviceId}, ${commandId}`, parser);
    }

    public getParser(deviceId: number, commandId: number) {
        return this._asyncParserMapping.get(`${deviceId}, ${commandId}`);;
    }

}
