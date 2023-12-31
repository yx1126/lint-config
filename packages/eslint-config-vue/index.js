const { isTs, getPackageVersion } = require("@yx1126/lint-config-utils");

const vue = getPackageVersion("vue");

const isVue2 = vue && vue.startsWith("^2.");

module.exports = {
    extends: [
        isVue2 ? "plugin:vue/recommended" : "plugin:vue/vue3-recommended",
        isTs ? "@yx1126/eslint-config-ts" : "@yx1126/eslint-config-basic",
    ],
    overrides: [
        {
            files: ["*.vue"],
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
    ],
    rules: {
        "vue/html-indent": ["error", 4],
        "vue/script-indent": ["error", 4, {
            baseIndent: 0,
            switchCase: 1,
        }],
        "vue/multi-word-component-names": "off",
        "vue/html-quotes": ["error", "double", { "avoidEscape": true }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 12,
            },
            "multiline": {
                "max": 1,
            },
        }],
        "vue/require-default-prop": "off",
        "vue/v-slot-style": ["error", {
            "atComponent": "shorthand",
            "default": "shorthand",
            "named": "shorthand",
        }],
        "vue/no-v-html": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/one-component-per-file": "off",
        "vue/no-reserved-component-names": "off",
        "vue/component-name-in-template-casing": ["error", "kebab-case", { "ignores": ["/^[A-Z][a-z0-9]+$/"] }],
    },
};
