const fs = require("fs-extra");
const { resolve: _resolve }  = require("path");

function resolveJson(name) {
    try {
        return fs.readJsonSync(_resolve(process.cwd(), ".", name)) || {};
    } catch (error) {
        return;
    }
}

function isTs() {
    return resolveJson("tsconfig.json");
}

function getPackageVersion(name) {
    const { devDependencies, dependencies } = resolveJson("package.json");
    if(devDependencies[name]) {
        return devDependencies[name];
    }
    if(dependencies[name]) {
        return dependencies[name];
    }
}

module.exports = {
    resolveJson,
    isTs,
    getPackageVersion,
};
