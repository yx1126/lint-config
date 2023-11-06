const fs = require("fs-extra");
const { resolve: _resolve }  = require("path");

function readJson(name) {
    try {
        return fs.readJsonSync(_resolve(process.cwd(), ".", name));
    } catch (error) {
        return;
    }
}

const isTs = readJson("tsconfig.json");

function getPackageVersion(name) {
    const { devDependencies, dependencies } = readJson("package.json") || {};

    if(devDependencies && devDependencies[name]) {
        return devDependencies[name];
    }
    if(dependencies && dependencies[name]) {
        return dependencies[name];
    }
}

module.exports = {
    readJson,
    isTs,
    getPackageVersion,
};
