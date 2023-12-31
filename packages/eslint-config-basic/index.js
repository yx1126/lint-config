module.exports = {
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
        "plugin:yml/standard",
    ],
    plugins: ["promise"],
    overrides: [
        {
            files: ["*.js", "*.jsx", "*.mjs", "*.cjs"],
            rules: {
                "indent": ["error", 4],
                "comma-dangle": ["error", "always-multiline"],
                "semi": ["error"],
                "no-var-requires": "off",
            },
        },
        {
            files: ["*.json", "*.json5", "*.jsonc"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/array-bracket-newline": ["error",
                    {
                        "multiline": true,
                        "minItems": null,
                    },
                ],
                "jsonc/array-bracket-spacing": ["error", "never"],
                "jsonc/indent": ["error", 4],
                "jsonc/comma-dangle": ["error", "never"],
                "jsonc/comma-style": ["error", "last"],
                "jsonc/key-spacing": ["error",
                    {
                        "beforeColon": false,
                        "afterColon": true,
                        "mode": "strict",
                    },
                ],
                "jsonc/object-curly-newline": ["error", { multiline: true, consistent: true }],
                "jsonc/object-curly-spacing": ["error", "always"],
                "jsonc/quotes": ["error", "double"],
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
                            "homepage",
                            "repository",
                            "bugs",
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
                ],
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
        "no-unused-vars": ["error", { "argsIgnorePattern": "^no_" }],
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
                "switch": { "after": false },
            },
        }],
        "object-curly-spacing": ["error", "always"],
        "space-before-blocks": "off",
        "no-async-promise-executor": "off",
        "no-inner-declarations": "off",
    },
};
