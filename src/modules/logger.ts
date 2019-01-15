// external imports
import * as winston from 'winston';


export interface ILogger {
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
    constructor() {
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
        logger.debug(message);
    }

    info(message: string): void {
        logger.info(message);
    }

    warn(message: string): void {
        logger.warn(message);
    }

    warning(message: string): void {
        this.warn(message);
    }

    error(message: string): void {
        logger.error(message);
    }

    exception(error: Error, message: string): void {
        if (!error) {
            this.error(message);
        } else {
            this.error(message + ' >> ' + error.stack);
        }
    }
}

export let defaultLogger: ILogger = new WinstonLogger();
