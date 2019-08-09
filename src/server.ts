// external imports
import * as http from 'http';
import * as ip from 'ip';

// internal imports
import {createLogger, ILogger} from './modules/logger';
import {App} from './modules/app';
import configuration = require('./configuration');
import {IApiDal} from './modules/api-dal-interface';
import {buildUartApiDal} from './modules/api-dal-uart';


let logger: ILogger = createLogger('server');

// TODO: need to inject dal type into here...
let apiDal: IApiDal = buildUartApiDal('/dev/ttyS0', 115200);


logger.debug('Server is starting');
configuration.defaultConfiguration.initialize(ip.address(), 2010);
logger.debug('Initializing with configuration: ' + JSON.stringify(configuration.defaultConfiguration));

logger.debug('Creating server and app');
const app = new App();
const server = http.createServer(app.expressApp);





logger.debug('Initializing app module');
app.initialize(server, apiDal, configuration.defaultConfiguration);

server.listen(configuration.defaultConfiguration.port, function () {
    console.log('Server is listening on: '
        + configuration.defaultConfiguration.address
        + ':'
        + configuration.defaultConfiguration.port
        + '(' + server.address().family + ')');
});
