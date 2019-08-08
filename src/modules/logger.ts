// external imports
import * as winston from 'winston';

// internal imports
import {IGenericKeyValuePair} from '../models/key-value-pair';
import {isStringNullOrWhitespace} from '../utilities/string-utilities';


export interface ILogger {
    readonly name: string;

    log(level: string, message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    exception(error: Error, message: string): void;
}


let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

// when debugging, it's helpful to add this line in the transports
// above to see the logging since you won't see it when deployed
//new (winston.transports.File)({ filename: 'SDK-API.log'})


class WinstonLogger implements ILogger {
    private readonly _name: string;
    private readonly _separator: string = ' >> ';

    public get name(): string {
        return this._name;
    }

    constructor(name: string) {
        this._name = name;

        logger.level = 'debug';

        //if (process.env == 'development') {
        //    logger.level = 'debug';
        //} else {
        //    logger.level = 'warn';
        //}
    }

    log(level: string, message: string): void {
        if (!level || !message)
            return;

        level = level.toLowerCase();

        switch (level) {
            case 'debug':
                this.debug(message);
                break;
            case 'info':
                this.info(message);
                break;
            case 'warn':
            case 'warning':
                this.warn(message);
                break;
            case 'error':
            case 'exception':
                this.error(message);
                break;
        }
    }

    debug(message: string): void {
        // logger.debug(this.name + this._separator + message);
    }

    info(message: string): void {
        // logger.info(this.name + this._separator + message);
    }

    warn(message: string): void {
        // logger.warn(this.name + this._separator + message);
    }

    warning(message: string): void {
        // this.warn(this.name + this._separator + message);
    }

    error(message: string): void {
        // logger.error(this.name + this._separator + message);
    }

    exception(error: Error, message: string): void {
        if (!error) {
            this.error(this.name + this._separator + message);
        } else {
            this.error(this.name + this._separator + message + this._separator + error.stack);
        }
    }
}

let _loggers: Array<IGenericKeyValuePair<string, ILogger>> = [];

let defaultLogger: ILogger = new WinstonLogger('default');
_loggers.push({key: defaultLogger.name, value: defaultLogger});

export function createLogger(name: string): ILogger {
    if (isStringNullOrWhitespace(name)) {
        name = 'default';
    }

    name = name.toUpperCase().trim();

    let logger: ILogger | null = getLoggerByName(name);
    if (!logger) {
        logger = new WinstonLogger(name);
    }

    return logger;
}

function getLoggerByName(name: string): ILogger | null {
    for (let i = 0; i < _loggers.length; i++) {
        let loggerKeyValuePair: IGenericKeyValuePair<string, ILogger> = _loggers[i];

        if (loggerKeyValuePair.key == name) {
            return loggerKeyValuePair.value;
        }
    }

    return null;
}