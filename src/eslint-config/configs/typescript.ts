import type { FlatESLintConfig, TsConfig, Rules } from "../eslint";
import tseslint from "typescript-eslint";
import process from "node:process";
import type { ParserOptions } from "@typescript-eslint/parser";
import { parser as TsParser } from "typescript-eslint";
import pluginTs from "@typescript-eslint/eslint-plugin";

export function defineTsRules(): Rules {
    return {
        "@typescript-eslint/adjacent-overload-signatures": "error",
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
        "@typescript-eslint/only-throw-error": "error",
        "@typescript-eslint/prefer-literal-enum-member": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/prefer-as-const": "error",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/no-empty-object-type": "error",
        "@typescript-eslint/no-wrapper-object-types": "error"
    }
}

export default function defineTsConfig(config?: TsConfig): FlatESLintConfig[]   {
    const { files = [], rules } = config || {};
    return [
        tseslint.configs.eslintRecommended as FlatESLintConfig,
        {
            name: "reallyx/typescript",
            files: ["**/*.?([cm])ts", "**/*.?([cm])tsx", ...files],
            languageOptions: {
                parser: TsParser,
                parserOptions: {
                    extraFileExtensions: [".vue"],
                    sourceType: "module",
                    tsconfigRootDir: process.cwd(),
                    projectService: {
                        allowDefaultProject: ["*.js"],
                    },
                    ecmaFeatures: {
                        jsx: true,
                    },
                    ...(config?.parserOptions as any),
                } as ParserOptions as any,
            },
            plugins: {
                "@typescript-eslint": pluginTs as any
            },
            rules: {
                ...defineTsRules(),
                ...rules,
            }
        },
    ];
}
