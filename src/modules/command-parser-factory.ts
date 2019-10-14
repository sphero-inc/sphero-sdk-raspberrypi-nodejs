
export interface ICommandParserFactory {

    addParser(processorId: number, deviceId: number, commandId: number, commandParserHandler: ICommandParserHandler): void;

    getParser(processorId: number, deviceId: number, commandId: number): ICommandParserHandler | null


}

export interface ICommandParserHandler {
    (dataRawBytes: Array<number>): object;
}

class CommandParserFactory implements ICommandParserFactory {
    private _commandParserMapping : Map<string, ICommandParserHandler>;

    constructor() {
        this._commandParserMapping = new Map<string, ICommandParserHandler>();
    }

    public addParser(sourceId: number, deviceId: number, commandId: number, commandParserHandler: ICommandParserHandler): void {
        let key: string = this.getMapKey(sourceId, deviceId, commandId);

        this._commandParserMapping.set(key, commandParserHandler);
    }

    public getParser(sourceId: number, deviceId: number, commandId: number): ICommandParserHandler | null {
        let key: string = this.getMapKey(sourceId, deviceId, commandId);

        let commandParserHandler: ICommandParserHandler | undefined | null = null;
        if (this._commandParserMapping.has(key)) {
            commandParserHandler = this._commandParserMapping.get(key);
        }

        return !commandParserHandler ? null : commandParserHandler;
    }

    private getMapKey(sourceId: number, deviceId: number, commandId: number): string {
        return `${sourceId}, ${deviceId}, ${commandId}`;
    }
}

let _commandParserFactory: ICommandParserFactory | null = null;
export function getCommandParserFactory(): ICommandParserFactory {
    if (_commandParserFactory == null) {
        _commandParserFactory = new CommandParserFactory();
    }

    return _commandParserFactory;
}
