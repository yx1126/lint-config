const { defineConfig } = require("eslint-define-config");
const basic = require("@yx1126/eslint-config-basic");
const process = require("node:process")

const tsconfig = process.env.ESLINT_TSCONFIG || "tsconfig.json"

module.exports = defineConfig({
    extends: [
        "@yx1126/eslint-config-basic",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".d.ts"],
            },
        },
    },
    overrides: basic.overrides.concat([
        {
            files: ["*.d.ts"],
            rules: {
                "import/no-duplicates": "off",
            },
        },
        {
            files: ["*.js", "*.cjs", "*.jsx"],
            rules: {
                "indent": ["error", 4],
                "quotes": "off",
                "@typescript-eslint/indent": "off",
                "no-var-requires": "off",
                "@typescript-eslint/no-var-requires": "off",
            },
        },
        {
            files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            parserOptions: {
                ecmaVersion: "latest",
                tsconfigRootDir: process.cwd(),
                project: [tsconfig]
            },
            rules: {
                "indent": "off",
                "quotes": "off",
                "@typescript-eslint/indent": ["error", 4],
                "comma-dangle": "off",
                "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
                "semi": "off",
                "@typescript-eslint/semi": ["error"],
            },
        },
    ]),
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "no-undef": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": ["error"],
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error", "never"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "@typescript-eslint/quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": ["error"],
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^no_" }],
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
    },
});