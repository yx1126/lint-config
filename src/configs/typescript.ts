import type { FlatESLintConfig, TsConfig, DeprecatedConfig } from "../types";
import tseslint from "typescript-eslint";
import process from "node:process";

function defaultRules(rules?: FlatESLintConfig["rules"]): FlatESLintConfig["rules"] {
    return {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/ban-types": [
            "error",
            {
                extendDefaults: true,
                types: {
                    Function: false,
                },
            },
        ],
        "@typescript-eslint/block-spacing": "error",
        "@typescript-eslint/brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],
        "@typescript-eslint/comma-spacing": "error",
        "@typescript-eslint/no-array-delete": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-duplicate-type-constituents": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-loss-of-precision": "error",
        "@typescript-eslint/no-meaningless-void-operator": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-redundant-type-constituents": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-template-expression": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unsafe-declaration-merging": "error",
        "@typescript-eslint/no-unsafe-enum-comparison": "error",
        "@typescript-eslint/no-unsafe-unary-minus": "error",
        "@typescript-eslint/no-unused-vars": ["error", {
            "varsIgnorePattern": "^_",
            "argsIgnorePattern": "^_"
        }],
        "@typescript-eslint/no-use-before-define": ["error", {
            functions: false,
            classes: false,
            variables: true,
            allowNamedExports: false,
        }],
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/only-throw-error": "error",
        "@typescript-eslint/prefer-literal-enum-member": "error",
        "@typescript-eslint/space-before-blocks": "error",
        "@typescript-eslint/space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always",
        }],
        "@typescript-eslint/no-dynamic-delete": "error",
        ...rules
    }
}

// Deprecated
function deprecatedRules(config?: DeprecatedConfig): FlatESLintConfig["rules"] {
    return {
        "@typescript-eslint/func-call-spacing": "error",
        "@typescript-eslint/indent": ["error", config?.indent ?? 4],
        "@typescript-eslint/key-spacing": ["error", {
            "mode": "strict",
        }],
        "@typescript-eslint/keyword-spacing": ["error", {
            overrides: {
                "if": { "after": false },
                "for": { "after": false },
                "while": { "after": false },
                "switch": { "after": false },
            },
        }],
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "@typescript-eslint/quotes": ["error", "double", {
            allowTemplateLiterals: true,
            avoidEscape: false
        }],
    }
}

export default function defineTsConfig(config?: TsConfig): FlatESLintConfig[] {
    return [
        ...tseslint.configs.recommended as FlatESLintConfig[],
        {
            files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
            languageOptions: {
                parserOptions: {
                    tsconfigRootDir: process.cwd(),
                    ...(config?.parserOptions as any)
                },
            },
            rules: Object.assign({}, defaultRules(config?.rules), config?.deprecated ? deprecatedRules(config) : null)
        }
    ];
}
