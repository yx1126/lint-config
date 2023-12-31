const basic = require("@yx1126/eslint-config-basic");
const process = require("node:process");
const { parseString } = require("@yx1126/lint-config-utils");

const tsconfig = parseString(process.env.ESLINT_TSCONFIG, "tsconfig.json");
const parserOptions = parseString(process.env.TS_PARSER_OPTIONS, {});

module.exports = {
    extends: [
        "@yx1126/eslint-config-basic",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: basic.overrides.concat([
        {
            files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            parserOptions: {
                ecmaVersion: "latest",
                tsconfigRootDir: process.cwd(),
                project: Array.isArray(tsconfig) ? tsconfig : [tsconfig],
                ...parserOptions,
            },
            rules: {
                "indent": "off",
                "@typescript-eslint/indent": ["error", 4],
                "comma-dangle": "off",
                "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
                "semi": "off",
                "@typescript-eslint/semi": ["error"],
                "@typescript-eslint/await-thenable": "error",
                "@typescript-eslint/consistent-type-exports": "error",
                "@typescript-eslint/consistent-type-imports": "error",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            },
        },
    ]),
    rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-undef": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": ["error"],
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error", "never"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "quotes": "off",
        "@typescript-eslint/quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": ["error"],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always",
        }],
        "no-useless-escape": "off",
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error"],
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": ["error"],
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "space-before-blocks": "off",
        "@typescript-eslint/space-before-blocks": ["error"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "@typescript-eslint/member-delimiter-style": ["error"],
        "@typescript-eslint/ban-types": [
            "error",
            {
                extendDefaults: true,
                types: {
                    Function: false,
                },
            },
        ],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "error",
    },
};
