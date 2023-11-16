const fs = require("fs-extra");
const json5 = require("json5");
const { resolve: _resolve }  = require("path");

function readJson(name) {
    try {
        const jsonStr = fs.readFileSync(_resolve(process.cwd(), ".", name));
        return json5.parse(jsonStr);
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

function parseString(value, defaultValue) {
    try {
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        return value;
    }
}

module.exports = {
    readJson,
    isTs,
    getPackageVersion,
    parseString,
};
