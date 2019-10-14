// internal imports
import mainDocumentSwaggerJSON = require('../api/v1.0/swagger.json');
import ledControlSwaggerJSON = require('../api/control-routers/led-control-swagger.json');
import driveControlSwaggerJSON = require('../api/control-routers/drive-control-swagger.json');
import infraredControlSwaggerJSON = require('../api/control-routers/infrared-control-swagger.json');
import sensorStreamingControlSwaggerJSON = require('../api/control-routers/sensor-streaming-swagger.json');


export function buildSwaggerDoc(): object {
    let mainDocumentSwagger: SwaggerObject = mainDocumentSwaggerJSON;
    let ledControlSwagger: SwaggerObject = ledControlSwaggerJSON;
    let driveControlSwagger: SwaggerObject = driveControlSwaggerJSON;
    let infraredControlSwagger: SwaggerObject = infraredControlSwaggerJSON;
    let sensorStreamingControlSwagger: SwaggerObject = sensorStreamingControlSwaggerJSON;

    let swaggerObjects: Array<SwaggerObject> = [ledControlSwagger, driveControlSwagger,
        infraredControlSwagger, sensorStreamingControlSwagger];

    for(let swaggerObject of swaggerObjects) {

        for(let path in swaggerObject.paths){
            mainDocumentSwagger.paths[path] = swaggerObject.paths[path];
        }

        for(let tag of swaggerObject.tags){
            mainDocumentSwagger.tags.push(tag);
        }
    }
    return mainDocumentSwagger;
}

interface SwaggerObject {
    'paths': SwaggerPaths,
    'tags': Array<object>
    [key: string]: any; // the swaggerMainDocument may potentially have more fields that we don't care about
}

interface SwaggerPaths {
    [path: string]: object;
}
