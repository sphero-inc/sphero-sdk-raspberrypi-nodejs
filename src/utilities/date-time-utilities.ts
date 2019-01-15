// internal imports
import {padWithZeros} from './string-utilities'
import {createLogger, ILogger} from '../modules/logger';


let logger: ILogger = createLogger('utilities');


export function getDateAsString(dt: Date): string {
    if (!dt) {
        throw new Error('Date is required!');
    }

    let dtText: string = padWithZeros(dt.getMonth() + 1, 2) + '/'
        + padWithZeros(dt.getDate(), 2) + '/'
        + dt.getFullYear() + ' @ '
        + padWithZeros(dt.getHours() + 1, 2) + ':'
        + padWithZeros(dt.getMinutes(), 2) + ':'
        + padWithZeros(dt.getSeconds(), 2) + '.'
        + padWithZeros(dt.getMilliseconds(), 3);

    logger.debug('getDateAsString generated: \'' + dtText + '\'');

    return dtText;
}
