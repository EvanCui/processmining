
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

export function processDefinitions() {
    return getApiBase() + "processdefinitions";
}

export function getKnowledgeBaseList() {
    return new Promise((resolve) => resolve([{
        Key: "Hpc",
        Name: "Hpc Job Analysis",
    }, {
        Key: "Financial",
        Name: "Financial Processes",
    }, {
        Key: "Procurement",
        Name: "Procurement Processes",
    }, {
        Key: "Production",
        Name: "Production Processes",
    }, {
        Key: "Logistics",
        Name: "Logistics Processes",
    }]));
}

export async function getProcessDefinitionList(knowledgeBaseKey: string, onError: any) {
    return new Promise((resolve) => resolve([
        { id: 1, name: "Process Definition 1", description: "This is the process definition 1" },
        { id: 2, name: "Process Definition 2", description: "This is the process definition 2" },
        { id: 3, name: "Job template 3", description: "This is the process definition 3" },
        { id: 4, name: "Task plan 4", description: "This is the process definition 4" },
        { id: 5, name: "Procurement process 5", description: "This is the process definition 5" },
        { id: 6, name: "Financial process 6", description: "This is the process definition 6" },
    ]));
    var processDefinitionsUri = processDefinitions();
    console.log("fetching " + processDefinitionsUri);
    let response = await fetch(processDefinitionsUri);
    console.log("loaded " + response);
    if (response.ok) {
        return await response.json();
    }
    else {
        onError(await response.text());
    }
}