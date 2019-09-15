// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from '../router-base';
import {IConfiguration} from '../../configuration';
import {IApiDal} from '../../modules/api-dal-interface';
import {LedControl} from "../../modules/controls/led-control";


export class LedControlRouter extends RouterBase {
    private static readonly _routerName: string = 'LedControl';

    private readonly _ledControl: LedControl;

    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(LedControlRouter._routerName, apiDal, configuration);
        this._ledControl = new LedControl(apiDal);
    }

    protected initializeRoutes(): void {
        this.router.route('/ledControl/getAvailableLedGroups')
            .get((request: Request, response: Response) => this.getAvailableLedGroups(request, response));

        this.router.route('/ledControl/getAvailableColors')
            .get((request: Request, response: Response) => this.getAvailableColors(request, response));

        this.router.route('/ledControl/turnLedsOff')
            .put((request: Request, response: Response) => this.turnLedsOff(request, response));

        this.router.route('/ledControl/setLedRgb')
            .put((request: Request, response: Response) => this.setLedRgb(request, response));

        this.router.route('/ledControl/setLedColor')
            .put((request: Request, response: Response) => this.setLedColor(request, response));

        this.router.route('/ledControl/setAllLedsRgb')
            .put((request: Request, response: Response) => this.setAllLedsRgb(request, response));

        this.router.route('/ledControl/setAllLedsColor')
            .put((request: Request, response: Response) => this.setAllLedsColor(request, response));

        this.router.route('/ledControl/setMultipleLedsRgb')
            .put((request: Request, response: Response) => this.setMultipleLedsRgb(request, response));

        this.router.route('/ledControl/setMultipleLedsColor')
            .put((request: Request, response: Response) => this.setMultipleLedsColor(request, response));
    }

    public getAvailableLedGroups(request: Request, response: Response) {
        let responsePayload: Array<string> = this._ledControl.getAvailableLedGroups();
        response.status(200).json(responsePayload);
    }

    public getAvailableColors(request: Request, response: Response) {
        let responsePayload: Array<string> = this._ledControl.getAvailableColors();
        response.status(200).json(responsePayload);
    }

    public turnLedsOff(request: Request, response: Response) {
        try {
            this._ledControl.turnLedsOff();
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public setLedRgb(request: Request, response: Response) {
        try {
            this._ledControl.setLedRgb(request.body.ledGroup, request.body.R, request.body.G, request.body.B);
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public setLedColor(request: Request, response: Response) {
        try {
            this._ledControl.setLedColor(request.body.ledGroup, request.body.color);
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public setAllLedsRgb(request: Request, response: Response) {
        try {
            this._ledControl.setAllLedsRgb(request.body.R, request.body.G, request.body.B);
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public setAllLedsColor(request: Request, response: Response) {
        try {
            this._ledControl.setAllLedsColor(request.body.color);
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public setMultipleLedsRgb(request: Request, response: Response) {
        try {
            this._ledControl.setMultipleLedsRgb(request.body.ledGroups, request.body.R, request.body.G, request.body.B);
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public setMultipleLedsColor(request: Request, response: Response) {
        try {
            this._ledControl.setMultipleLedsColor(request.body.ledGroups, request.body.color);
            response.sendStatus(200);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }
}


