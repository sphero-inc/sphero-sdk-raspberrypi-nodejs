import swaggerMainDocument = require('../api/v1.0/swagger.json');
import swaggerAdditionalContent = require('../api/control-routers/sensor-streaming-metadata.json');


export function buildSwaggerDoc() {

    for(let path in swaggerAdditionalContent.paths){
        // @ts-ignore
        swaggerMainDocument.paths[path] = swaggerAdditionalContent.paths[path];
    }

    for(let tag of swaggerAdditionalContent.tags){
        // @ts-ignore
        swaggerMainDocument.tags.push(tag);
    }

    // console.log(`----- swaggerMainDocument ----- ${JSON.stringify(swaggerMainDocument)}`);
    return swaggerMainDocument;
}
