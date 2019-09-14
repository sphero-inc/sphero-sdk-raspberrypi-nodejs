// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from './router-base';
import {IConfiguration} from '../configuration';
import {IApiDal} from '../modules/api-dal-interface';
import {InfraredControl} from "../modules/controls/infrared-control";

export class InfraredControlRouter extends RouterBase {
    private static readonly _routerName: string = 'InfraredControl';

    private readonly _infraredControl: InfraredControl;

    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(InfraredControlRouter._routerName, apiDal, configuration);
        this._infraredControl = new InfraredControl(apiDal);
    }

    protected initializeRoutes(): void {
        this.router.route('/startInfraredBroadcasting')
            .put((request: Request, response: Response) => this.startInfraredBroadcasting(request, response));

        this.router.route('/stopInfraredBroadcasting')
            .put((request: Request, response: Response) => this.stopInfraredBroadcasting(request, response));

        this.router.route('/startInfraredFollowing')
            .put((request: Request, response: Response) => this.startInfraredFollowing(request, response));

        this.router.route('/stopInfraredFollowing')
            .put((request: Request, response: Response) => this.stopInfraredFollowing(request, response));

        this.router.route('/sendInfraredMessages')
            .put((request: Request, response: Response) => this.sendInfraredMessages(request, response));

        this.router.route('/listenForInfraredMessage')
            .put((request: Request, response: Response) => this.listenForInfraredMessage(request, response));
    }

    public startInfraredBroadcasting(request: Request, response: Response) {
        try {
            this._infraredControl.startInfraredBroadcasting(request.body.farCode, request.body.nearCode);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public stopInfraredBroadcasting(request: Request, response: Response) {
        try {
            this._infraredControl.stopInfraredBroadcasting();
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public startInfraredFollowing(request: Request, response: Response) {
        try {
            this._infraredControl.startInfraredFollowing(request.body.farCode, request.body.nearCode);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public stopInfraredFollowing(request: Request, response: Response) {
        try {
            this._infraredControl.stopInfraredFollowing();
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public sendInfraredMessages(request: Request, response: Response) {
        try {
            this._infraredControl.sendInfraredMessages(request.body.messages, request.body.strength);
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }

    public listenForInfraredMessage(request: Request, response: Response) {
        try {
            this._infraredControl.listenForInfraredMessage();
        } catch(reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in resetHeading: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }



}


