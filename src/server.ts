// external imports
import * as http from 'http';
import * as ip from 'ip';

// internal imports
import {createLogger, ILogger} from './modules/logger';
import {App} from './modules/app';
import configuration = require('./configuration');


let logger: ILogger = createLogger('server');


logger.info('Server is starting');
configuration.defaultConfiguration.initialize(ip.address(), 2010);
logger.info('Initializing with configuration: ' + JSON.stringify(configuration.defaultConfiguration));

logger.info('Creating server and app');
const app = new App();
const server = http.createServer(app.expressApp);

logger.info('Initializing app module');
app.initialize(server, configuration.defaultConfiguration);

server.listen(configuration.defaultConfiguration.port, function () {
    logger.info('Server is listening on: '
        + configuration.defaultConfiguration.address
        + ':'
        + configuration.defaultConfiguration.port
        + '(' + server.address().family + ')');
});
