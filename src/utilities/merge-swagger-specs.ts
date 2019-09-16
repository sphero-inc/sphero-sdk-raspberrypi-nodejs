let swaggerMainDocument = require('../api/v1.0/swagger.json');
import ledControlSwagger = require('../api/control-routers/led-control-metadata.json');
import driveControlSwagger = require('../api/control-routers/drive-control-metadata.json');
import infraredControlSwagger = require('../api/control-routers/infrared-control-metadata.json');



export function buildSwaggerDoc(): object {
    let swaggerObjects: Array<object> = [ledControlSwagger, driveControlSwagger,
        infraredControlSwagger];

    for(let swaggerObject of swaggerObjects) {
        // @ts-ignore
        for(let path in swaggerObject.paths){
            // @ts-ignore
            swaggerMainDocument.paths[path] = swaggerObject.paths[path];
        }
        // @ts-ignore
        for(let tag of swaggerObject.tags){
            // @ts-ignore
            swaggerMainDocument.tags.push(tag);
        }

    }
    // console.log(`----- swaggerMainDocument ----- ${JSON.stringify(swaggerMainDocument)}`);
    return swaggerMainDocument;
}
