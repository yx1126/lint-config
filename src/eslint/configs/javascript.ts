import type { FlatESLintConfig, BaseConfig } from "../../../types/eslint";
import globals from "globals";

export function defineRules(): FlatESLintConfig["rules"] {
    return {
        "array-callback-return": ["error", {
            allowImplicit: true,
            checkForEach: false,
        }],
        "constructor-super": "error",
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "off",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-constant-binary-expression": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": ["error", {
            includeExports: true,
        }],
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-ex-assign": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-import-assign": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-loss-of-precision": "error",
        "no-misleading-character-class": "error",
        "no-new-native-nonconstructor": "error",
        "no-obj-calls": "error",
        "no-promise-executor-return": "error",
        "no-prototype-builtins": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-setter-return": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "off",
        "no-this-before-super": "error",
        "no-undef": "off",
        "no-unexpected-multiline": "error",
        "no-unmodified-loop-condition": "off",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-vars": ["error", {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
        }],
        "no-use-before-define": ["error", {
            functions: false,
            classes: false,
            variables: true,
            allowNamedExports: false,
        }],
        "no-useless-backreference": "error",
        "no-useless-catch": "error",
        "no-useless-escape": "off",
        "require-yield": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        "no-unused-private-class-members": "error",
        "semi-spacing": "error",
        "space-unary-ops": "error",

        // Suggestions
        "block-scoped-var": "error",
        "no-alert": "error",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-delete-var": "error",
        "no-else-return": ["error", {
            allowElseIf: false,
        }],
        "no-empty": "error",
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-global-assign": "error",
        "no-label-var": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "no-with": "error",
        "prefer-const": ["error", { destructuring: "all" }],
        "func-name-matching": "error",
        "no-extra-boolean-cast": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-shadow-restricted-names": "error",
        "no-throw-literal": "error",
    };
}

export default function defineJsConfig(config?: BaseConfig): FlatESLintConfig[] {
    return [{
        name: "yx1126/javascript",
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                document: "readonly",
                navigator: "readonly",
                window: "readonly",
            },
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    }, {
        name: "yx1126/javascript/rules",
        ...config,
        rules: {
            ...defineRules(),
            ...config?.rules,
        },
    }, {
        name: "yx1126/jsx",
        files: ["**/*.?([cm])jsx", "**/*.?([cm])tsx"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    }];
}