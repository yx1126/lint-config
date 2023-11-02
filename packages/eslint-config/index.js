const { isPackageExists, getPackageInfoSync } = require("local-pkg");

const vue = getPackageInfoSync("vue");

const isExistTs = isPackageExists("typescript");

const extend = vue ? "@yx1126/eslint-config-vue" : isExistTs ? "@yx1126/eslint-config-ts" : "@yx1126/eslint-config-basic";

module.exports = {
    extends: [extend],
};
