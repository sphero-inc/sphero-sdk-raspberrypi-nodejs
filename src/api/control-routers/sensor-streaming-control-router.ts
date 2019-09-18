// external imports
import {Request, Response} from 'express';

// internal imports
import {RouterBase} from '../router-base';
import {IConfiguration} from '../../configuration';
import {IApiDal} from '../../modules/api-dal-interface';
import {SensorControl} from '../../modules/controls/v1.0/sensor-control';

export class SensorStreamingControlRouter extends RouterBase {
    private static readonly _routerName: string = 'SensorStreamingControl';
    private readonly _sensorControl: SensorControl;

    constructor(apiDal: IApiDal, configuration: IConfiguration) {
        super(SensorStreamingControlRouter._routerName, apiDal, configuration);
        this._sensorControl = new SensorControl(this._apiDal);
    }

    protected initializeRoutes(): void {
        this.router.route('/sensorControl/getAvailableSensorsToStream')
            .get((request: Request, response: Response) => this.getAvailableSensorsToStream(request, response));

        this.router.route('/sensorControl/startSensorStreaming')
            .put((request: Request, response: Response) => this.startSensorStreaming(request, response));

        this.router.route('/sensorControl/stopSensorStreaming')
            .put((request: Request, response: Response) => this.stopStreamingSensors(request, response));
    }


    public getAvailableSensorsToStream(request: Request, response: Response) {
        let responsePayload: Array<string> = this._sensorControl.getSupportedStreamingServices();
        response.status(200).json(responsePayload);
    }

    public startSensorStreaming(request: Request, response: Response) {
        if (!request.body) {
            let errorCode: number = 400;
            let errorDetail: string = 'Payload is required!';
            response.status(errorCode).json({'error': errorDetail});
            return;
        }

        try {
            this._sensorControl.startStreaming(request.body.sensors, request.body.interval);
            response.sendStatus(200);
        } catch (reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in startSensorStreaming: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});
        }
    }


    public stopStreamingSensors(request: Request, response: Response) {
        try {
            this._sensorControl.stopStreaming();
            response.sendStatus(200);

        } catch (reason) {
            let errorCode: number = 400;
            let errorDetail: string = `Error in stopStreamingSensors: ${reason}`;

            // this.routeError(request.path, request.method, errorCode, errorDetail);

            response.status(errorCode).json({'error': errorDetail});

        }
    }

}



