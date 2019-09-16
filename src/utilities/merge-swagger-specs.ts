let swaggerMainDocument: SwaggerObject = require('../api/v1.0/swagger.json');
let ledControlSwagger: SwaggerObject = require('../api/control-routers/led-control-metadata.json');
let driveControlSwagger: SwaggerObject = require('../api/control-routers/drive-control-metadata.json');
let infraredControlSwagger: SwaggerObject = require('../api/control-routers/infrared-control-metadata.json');



export function buildSwaggerDoc(): object {
    let swaggerObjects: Array<SwaggerObject> = [ledControlSwagger, driveControlSwagger,
        infraredControlSwagger];

    for(let swaggerObject of swaggerObjects) {

        for(let path in swaggerObject.paths){
            swaggerMainDocument.paths[path] = swaggerObject.paths[path];
        }

        for(let tag of swaggerObject.tags){
            swaggerMainDocument.tags.push(tag);
        }

    }

    return swaggerMainDocument;
}

interface SwaggerObject {
    'paths': SwaggerPaths,
    'tags': Array<object>
    [key: string]: any; // the swaggerMainDocument may potentially have more fields that we don't care about
}

interface SwaggerPaths {
    [path: string]: object;
}