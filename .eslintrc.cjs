const { defineConfig } = require("eslint-define-config");
const process = require("node:process");

process.env.ESLINT_TSCONFIG = "tsconfig.json";

module.exports = defineConfig({
    root: true,
    extends: ["@yx1126/eslint-config"],
});
