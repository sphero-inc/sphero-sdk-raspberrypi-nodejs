

export interface ICommandParserHandler {
    (dataRawBytes: Array<number>): object;
}

export class CommandParserFactory {
    private _commandParserMapping : Map<string, ICommandParserHandler>;

    constructor() {
        this._commandParserMapping = new Map<string, ICommandParserHandler>();
    }

    public addParser(deviceId: number, commandId: number, commandParserHandler: ICommandParserHandler): void {
        let key: string = this.getMapKey(deviceId, commandId);

        this._commandParserMapping.set(key, commandParserHandler);
    }

    public getParser(deviceId: number, commandId: number): ICommandParserHandler | null {
        let key: string = this.getMapKey(deviceId, commandId);

        let commandParserHandler: ICommandParserHandler | undefined | null = null;
        if (this._commandParserMapping.has(key)) {
            commandParserHandler = this._commandParserMapping.get(key);
        }

        return !commandParserHandler ? null : commandParserHandler;
    }

    private getMapKey(deviceId: number, commandId: number): string {
        return `${deviceId}, ${commandId}`;
    }
}

// TODO: create an interface for CommandParserFactory and export the interface instead of the class
// TODO: create a builder method that instantiates only a single instance of the CommandParserFactory and returns the interface (see api-command-message.ts for a reference)