import {ApiTargetsAndSources} from '../constants';
import {IApiDal} from './api-dal-interface';
import {ByteConversionUtilities} from '../utilities/byte-conversion-utilities'
import {IStreamingProvider, StreamingProvider} from '../models/streaming-provider'
import {IStreamingSlot, StreamingSlot} from '../models/streaming-slot';
import {IStreamingService, StreamingService} from '../models/streaming-service';
import {IStreamingServiceAttribute, StreamingServiceAttribute} from '../models/streaming-service-attribute';


export class SensorControl {
    static readonly sourceId: number = ApiTargetsAndSources.serviceSource;

    static readonly sensorDeviceId: number = 0x18;
    static readonly sensorDeviceName: string = 'sensor';

    // use an enumeration for this?
    private readonly _eightBitEnum: number = 0x00;
    private readonly _sixteenBitEnum: number = 0x01;
    private readonly _thirtyTwoBitEnum: number = 0x02;

    private readonly _processorIdNordic: number = 0x01;
    private readonly _processorIdST: number = 0x02;

    private readonly _apiDal: IApiDal;

    private _isCurrentlyStreaming: boolean;

    private readonly _supportedStreamingServices: Map<string, IStreamingService> = new Map<string, IStreamingService>();
    private readonly _streamingProviders: Array<IStreamingProvider> = [];

    constructor(apiDal: IApiDal) {
        this._apiDal = apiDal;

        let quaternionW: IStreamingServiceAttribute = new StreamingServiceAttribute('W', -1.0, 1.0);
        let quaternionX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -1.0, 1.0);
        let quaternionY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -1.0, 1.0);
        let quaternionZ: IStreamingServiceAttribute = new StreamingServiceAttribute('Z', -1.0, 1.0);
        let quaternion: IStreamingService = new StreamingService(0x00, 'Quaternion',
            [quaternionW, quaternionX, quaternionY, quaternionZ], this._sixteenBitEnum);

        let attitudePitch: IStreamingServiceAttribute = new StreamingServiceAttribute('Pitch', -180.0, 180.0);
        let attitudeRoll: IStreamingServiceAttribute = new StreamingServiceAttribute('Roll', -90.0, 90.0);
        let attitudeYaw: IStreamingServiceAttribute = new StreamingServiceAttribute('Yaw', -180.0, 180.0);
        let attitude: IStreamingService = new StreamingService(0x01, 'IMU', [attitudePitch, attitudeRoll, attitudeYaw], this._sixteenBitEnum);

        let accelerometerX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -16.0, 16.0);
        let accelerometerY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -16.0, 16.0);
        let accelerometerZ: IStreamingServiceAttribute = new StreamingServiceAttribute('Z', -16.0, 16.0);
        let accelerometer: IStreamingService  = new StreamingService(0x02, 'Accelerometer', [accelerometerX,
            accelerometerY, accelerometerZ], this._sixteenBitEnum);

        let colorDetectionR: IStreamingServiceAttribute = new StreamingServiceAttribute('R', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionG: IStreamingServiceAttribute = new StreamingServiceAttribute('G', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionB: IStreamingServiceAttribute = new StreamingServiceAttribute('B', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionIndex: IStreamingServiceAttribute = new StreamingServiceAttribute('Index', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionConfidence: IStreamingServiceAttribute = new StreamingServiceAttribute('Confidence', 0.0, 1.0);
        let colorDetection: IStreamingService = new StreamingService(0x03, 'ColorDetection',
            [colorDetectionR, colorDetectionG, colorDetectionB, colorDetectionIndex, colorDetectionConfidence], this._eightBitEnum);

        let gyroscopeX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -2000.0, 2000.0);
        let gyroscopeY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -2000.0, 2000.0);
        let gyroscopeZ: IStreamingServiceAttribute = new StreamingServiceAttribute('Z', -2000.0, 2000.0);
        let gyroscope: IStreamingService = new StreamingService(0x04, 'Gyroscope', [gyroscopeX, gyroscopeY, gyroscopeZ],
            this._sixteenBitEnum);

        let locatorX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', ByteConversionUtilities.int32MinValue, ByteConversionUtilities.int32MaxValue);
        let locatorY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', ByteConversionUtilities.int32MinValue, ByteConversionUtilities.int32MaxValue);
        let locator: IStreamingService = new StreamingService(0x06, 'Locator', [locatorX, locatorY], this._sixteenBitEnum);

        let velocityX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', ByteConversionUtilities.int32MinValue, ByteConversionUtilities.int32MaxValue);
        let velocityY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', ByteConversionUtilities.int32MinValue, ByteConversionUtilities.int32MaxValue);
        let velocity: IStreamingService = new StreamingService(0x07, 'Velocity', [velocityX, velocityY], this._sixteenBitEnum);

        let speedMPS: IStreamingServiceAttribute = new StreamingServiceAttribute('MPS', 0, 2.0068307);
        let speed: IStreamingService = new StreamingService(0x08, 'Speed', [speedMPS], this._sixteenBitEnum);

        let coreTimeUpper: IStreamingServiceAttribute = new StreamingServiceAttribute('Time (upper)', 0, ByteConversionUtilities.uint32MaxValue);
        let coreTimeLower: IStreamingServiceAttribute = new StreamingServiceAttribute('Time (lower)', 0, ByteConversionUtilities.uint32MaxValue);
        let coreTime: IStreamingService = new StreamingService(0x09, 'CoreTime', [coreTimeUpper, coreTimeLower], this._thirtyTwoBitEnum);

        let ambientLightLight: IStreamingServiceAttribute = new StreamingServiceAttribute('Light', 0, 12000.0);
        let ambientLight: IStreamingService = new StreamingService(0x0A, 'AmbientLight', [ambientLightLight], this._sixteenBitEnum);

        this._supportedStreamingServices.set(quaternion.name,     quaternion);
        this._supportedStreamingServices.set(attitude.name,       attitude);
        this._supportedStreamingServices.set(accelerometer.name,  accelerometer);
        this._supportedStreamingServices.set(colorDetection.name, colorDetection);
        this._supportedStreamingServices.set(gyroscope.name,      gyroscope);
        this._supportedStreamingServices.set(locator.name,        locator);
        this._supportedStreamingServices.set(velocity.name,       velocity);
        this._supportedStreamingServices.set(speed.name,          speed);
        this._supportedStreamingServices.set(coreTime.name,       coreTime);
        this._supportedStreamingServices.set(ambientLight.name,   ambientLight);

        let slotNordic1: IStreamingSlot  = new StreamingSlot(1, [colorDetection]);
        let slotNordic2: IStreamingSlot  = new StreamingSlot(2, [coreTime]);
        let slotNordic3: IStreamingSlot  = new StreamingSlot(3, [ambientLight]);

        let slotST1: IStreamingSlot  = new StreamingSlot(1, [quaternion, attitude, accelerometer, gyroscope]);
        let slotST2: IStreamingSlot  = new StreamingSlot(2, [locator, velocity, speed]);

        let nordicStreamingProvider: IStreamingProvider = new StreamingProvider(this._processorIdNordic, [slotNordic1, slotNordic2, slotNordic3], this._apiDal);
        let stStreamingProvider: IStreamingProvider = new StreamingProvider(this._processorIdST, [slotST1, slotST2], this._apiDal);

        this._streamingProviders.push(nordicStreamingProvider);
        this._streamingProviders.push(stStreamingProvider);

        this._isCurrentlyStreaming = false;
    }


    /**
     * Returns the sensors supported as list of sensor names, e.g. ['Quaternion','IMU','Accelerometer',
     * 'ColorDetection', 'Gyroscope', 'Locator','Velocity','Speed','CoreTime','AmbientLight']
     */
    public getSupportedStreamingServices(): Array<string> {
        return Array.from(this._supportedStreamingServices.keys());
    }

    /**
     * Starts sensor streaming for given sensors and streaming interval
     * @param streamingServiceNames
     * @param streamingInterval
     */
    public startStreaming(streamingServiceNames: Array<string>, streamingInterval: number): void {
        if (this._isCurrentlyStreaming) {
            throw new Error('already streaming; stop current streaming first');
        }
        if (streamingServiceNames.length == 0){
            throw new Error('parameter streamingServiceNames must contain at least one valid streaming service name');
        }

        for(let streamingServiceName of streamingServiceNames) {
            let sensor: IStreamingService | undefined = this._supportedStreamingServices.get(streamingServiceName);
            if (sensor == undefined)
                throw new Error(`no such sensor: ${streamingServiceName}`);
            sensor.enable();
        }

        for(let streamingProvider of this._streamingProviders) {
            if (!streamingProvider.hasEnabledStreamingServices) {
                continue;
            }
            streamingProvider.startStreaming(streamingInterval);
        }

        this._isCurrentlyStreaming = true;
    }

    /**
     * Stops sensor streaming on providers presuming they have one or more slots that are currently configured to stream
     */
    public stopStreaming(): void {
        if (!this._isCurrentlyStreaming) {
            throw new Error('not currently streaming');
        }

        for(let streamingProvider of this._streamingProviders) {
            if (!streamingProvider.isStreaming) {
                continue;
            }
            streamingProvider.stopStreaming();
        }

        this._isCurrentlyStreaming = false;

    }
}
