// internal imports
import {padWithZeros} from './string-utilities'
import {defaultLogger as logger} from '../modules/logger';


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
