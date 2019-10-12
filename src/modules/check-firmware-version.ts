import {IApiDal} from './api-dal-interface';
import {buildApiCommandMessageWithDefaultFlags, IApiCommandMessage} from '../models/api-command-message';
import {ApiTargetsAndSources} from '../constants';
import * as http from 'http';
import {
    IGetMainApplicationVersionResponse,
    parseGetMainApplicationVersionResponse
} from '../api/v1.0/command-parsers/0x11-system-info/0x00-get-main-application-version-command-parser';
import {IApiResponseMessage} from '../models/api-response-message';
import {createLogger, ILogger} from './logger';
import {Version} from '../models/version';

let logger: ILogger = createLogger('check firmware version');

export class FirmwareVersionChecker {
    private readonly _apiDal: IApiDal;

    constructor(apiDal: IApiDal) {
        this._apiDal = apiDal;
    }

    public checkVersions(): void {
        this.checkProcessorVersion(1, 'Nordic', 'http://cms-api-production.platform.sphero.com/api/v1/products/rvr/content_packs/nordic_mainapp_ota/versions/published');
        this.checkProcessorVersion(2, 'ST', 'http://cms-api-production.platform.sphero.com/api/v1/products/rvr/content_packs/st_mainapp_ota/versions/published');
    }

    private checkProcessorVersion(processorId: number, processorName: string, url: string): void {
        http.get(url, response => {
            response.setEncoding('utf8');
            let body = '';
            response.on('data', data => {
                body += data;
            });
            response.on('end', () => {
                this.sendGetFwVersionCommand(processorId).then(apiResponseMessage => {
                    let versionResponse: IGetMainApplicationVersionResponse = parseGetMainApplicationVersionResponse(apiResponseMessage.dataRawBytes);
                    let usedVersion = new Version(versionResponse.major, versionResponse.minor, versionResponse.revision);

                    let availableVersions: Array<Version> = JSON.parse(body).versions.map((versionString: string) => Version.versionStringToVersionObject(versionString));
                    let latestAvailableVersion: Version = Version.latestVersionOf(availableVersions);

                    if(!usedVersion.equals(latestAvailableVersion)) {
                        logger.warning(this.warningMessage(processorName, usedVersion, latestAvailableVersion));
                    }
                });
            });
        });
    }

    private warningMessage(processorName: string, usedVersion: Version, latestAvailableVersion: Version): string {
        return `The firmware version on RVR's ${processorName} processor is ${Version.versionObjectToVersionString(usedVersion)} but the latest available version is ${Version.versionObjectToVersionString(latestAvailableVersion)}. Update recommended.`;
    }

    private sendGetFwVersionCommand(targetId: number): Promise<IApiResponseMessage> {
        let deviceId: number = 0x11;
        let deviceName: string = 'system info';

        let commandId: number = 0x00;
        let commandName: string = '';

        let apiCommandMessage: IApiCommandMessage = buildApiCommandMessageWithDefaultFlags(
            targetId, ApiTargetsAndSources.serviceSource,
            deviceId, deviceName,
            commandId, commandName,
            null
        );

        apiCommandMessage.generateMessageRawBytes();
        return this._apiDal.sendApiCommandMessage(apiCommandMessage);
    }

}
