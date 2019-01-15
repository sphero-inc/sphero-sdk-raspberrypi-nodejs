// external imports
import {Router} from 'express';


export interface IRouter {
    readonly name: string;
    readonly router: Router;

    initialize(): void;
}

export interface IDeviceRouter {
    readonly deviceId: number;
}
