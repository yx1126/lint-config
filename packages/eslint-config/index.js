const { isTs, getPackageVersion } = require("@yx1126/lint-config-utils");

const vue = getPackageVersion("vue");

const extend = vue ? "@yx1126/eslint-config-vue" : isTs ? "@yx1126/eslint-config-ts" : "@yx1126/eslint-config-basic";

module.exports = {
    extends: [extend],
};
