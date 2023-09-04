const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    ignorePatterns: [
        "node_modules",
        "dist",
        "out",
        "output",
        "public",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:jsonc/recommended-with-jsonc",
        "plugin:import/recommended",
        "plugin:yml/standard"
    ],
    plugins: ["promise", "import"],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".mjs"],
            },
        },
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            parserOptions: {
                ecmaVersion: "latest",
                tsconfigRootDir: process.cwd(),
                project: ["tsconfig.json"],
            },
            rules: {
                "indent": ["error", 4],
                "comma-dangle": ["error", "always-multiline"],
                "semi": ["error"],
            },
        },
        {
            files: ["*.json", "*.json5", "*.jsonc"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/array-bracket-newline": ["error",
                    {
                        "multiline": true,
                        "minItems": null
                    }
                ],
                "jsonc/array-bracket-spacing": ["error", "never"],
                "jsonc/indent": ["error", 4],
                "jsonc/comma-dangle": ["error", "never"],
                "jsonc/comma-style": ["error", "last"],
                "jsonc/key-spacing": ["error",
                    {
                        "beforeColon": false,
                        "afterColon": true,
                        "mode": "strict"
                    }
                ],
                "jsonc/object-curly-newline": ["error", { multiline: true, consistent: true }],
                "jsonc/object-curly-spacing": ["error", "always"],
                "jsonc/quotes": ["error", "double"]
            },
        },
        {
            files: ["*.yaml", "*.yml"],
            parser: "yaml-eslint-parser",
            rules: {
                "spaced-comment": "off",
            },
        },
        {
            files: ["package.json"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        pathPattern: "^$",
                        order: [
                            "name",
                            "version",
                            "private",
                            "packageManager",
                            "description",
                            "type",
                            "keywords",
                            "homepage",
                            "bugs",
                            "license",
                            "author",
                            "contributors",
                            "funding",
                            "files",
                            "main",
                            "module",
                            "exports",
                            "unpkg",
                            "jsdelivr",
                            "browser",
                            "bin",
                            "man",
                            "directories",
                            "repository",
                            "publishConfig",
                            "scripts",
                            "peerDependencies",
                            "peerDependenciesMeta",
                            "optionalDependencies",
                            "dependencies",
                            "devDependencies",
                            "engines",
                            "config",
                            "overrides",
                            "pnpm",
                            "husky",
                            "lint-staged",
                            "eslintConfig",
                        ],
                    },
                    {
                        pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                        order: { type: "asc" },
                    },
                    {
                        pathPattern: "^exports.*$",
                        order: [
                            "types",
                            "import",
                            "require",
                            "default",
                        ],
                    },
                ]
            },
        },
    ],
    rules: {
        "ban-ts-comment": "off",
        "no-undef": "off",
        "no-explicit-any": "off",
        "default-param-last": ["error"],
        "func-call-spacing": ["error", "never"],
        "no-non-null-assertion": "off",
        "quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "space-infix-ops": ["error"],
        "no-unused-vars": ["warn", { "argsIgnorePattern": "^no_" }],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always",
        }],
        "no-useless-escape": "off",
        "max-len": ["error", {
            code: 200,
        }],
        "array-bracket-spacing": "error",
        "block-spacing": "error",
        "brace-style": ["error"],
        "comma-spacing": ["error"],
        "comma-style": "error",
        "computed-property-spacing": "error",
        "key-spacing": ["error", {
            "mode": "strict",
        }],
        "keyword-spacing": ["error", {
            overrides: {
                "if": { "after": false },
                "for": { "after": false },
                "while": { "after": false },
            },
        }],
        "object-curly-spacing": ["error", "always"],
        "space-before-blocks": "off",
    },
});
