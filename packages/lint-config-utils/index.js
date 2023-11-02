const fs = require("fs-extra");
const { resolve: _resolve }  = require("path");

function resolve(name) {
    return fs.readJsonSync(_resolve(process.cwd(), ".", name)) || {};
}

function isTs() {
    return resolve("tsconfig.json");
}

function getPackageVersion(name) {
    try {
        const pkg = resolve("package.json");
        const dependencies = pkg.devDependencies || pkg.dependencies || {};
        return dependencies[name];
    } catch (error) {
        return;
    }
}

module.exports = {
    resolve,
    isTs,
    getPackageVersion,
};
