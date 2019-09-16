import swaggerMainDocument = require('../api/v1.0/swagger.json');
import ledControlSwagger = require('../api/control-routers/led-control-router');
import driveControlSwagger = require('../api/control-routers/drive-control-router');
import infraredControlSwagger = require('../api/control-routers/infrared-control-router');



export function buildSwaggerDoc(): object {
    let swaggerObjects: Array<object> = [ledControlSwagger, driveControlSwagger,
        infraredControlSwagger];

    for(let swaggerObject of swaggerObjects) {
        // @ts-ignore
        for(let path in swaggerContent.paths){
            // @ts-ignore
            swaggerMainDocument.paths[path] = swaggerAdditionalContent.paths[path];
        }
        // @ts-ignore
        for(let tag of swaggerContent.tags){
            // @ts-ignore
            swaggerMainDocument.tags.push(tag);
        }

    }
    // console.log(`----- swaggerMainDocument ----- ${JSON.stringify(swaggerMainDocument)}`);
    return swaggerMainDocument;
}
