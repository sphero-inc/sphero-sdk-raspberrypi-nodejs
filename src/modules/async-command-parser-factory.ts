
export class AsyncParserFactory {
    private _asyncParserMapping : Map<any, any>;

    constructor() {
        console.log("constructing factory object...");
        this._asyncParserMapping = new Map<any, any>();
    }

    public addParser(deviceId: number, commandId: number, parser: any) {
        this._asyncParserMapping.set(`${deviceId}, ${commandId}`, parser);
    }

    public getParser(deviceId: number, commandId: number) {
        console.log("in get parser func witin parser");
        console.log(deviceId, commandId);
        let val = this._asyncParserMapping.get(`${deviceId}, ${commandId}`);
        console.log(val);
        return val;
    }

}