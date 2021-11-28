
function isProduction() {
    return false;
}

function getApiBase() {
    let production = isProduction();
    if (production) {
        return "http://productiondomain/v1/";
    } else {
        return "http://localhost:5062/v1/";
    }
}

export function processDefinitions(){
    return getApiBase() + "processdefinitions";
}