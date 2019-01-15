// external imports
import * as http from 'http';
import * as ip from 'ip';

// internal imports
import {defaultLogger as logger} from './modules/logger';
import {App} from './modules/app';
import configuration = require('./configuration');


logger.info('SDK API server is starting');
configuration.defaultConfiguration.initialize(ip.address(), 2010);
logger.info('SDK API initializing with configuration: ' + JSON.stringify(configuration.defaultConfiguration));

logger.info('SDK API creating server and app');
const app = new App();
const server = http.createServer(app.expressApp);

logger.info('SDK API initializing app module');
app.initialize(server, configuration.defaultConfiguration);

server.listen(configuration.defaultConfiguration.port, function () {
    logger.info('SDK API server is listening on: '
        + configuration.defaultConfiguration.address
        + ':'
        + configuration.defaultConfiguration.port
        + '(' + server.address().family + ')');
});
